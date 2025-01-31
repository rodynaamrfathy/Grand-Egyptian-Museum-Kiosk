export interface Recorder {
    start: () => void;
    stop: () => Promise<Blob>;
}

export const createScreenRecorder = async (): Promise<Recorder> => {
    // Request both video and audio
    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
    });

    // Optionally, include the microphone audio
    const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const combinedStream = new MediaStream([
        ...stream.getTracks(),
        ...audioStream.getTracks(),
    ]);

    const mediaRecorder = new MediaRecorder(combinedStream);
    let chunks: BlobPart[] = [];

    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            chunks.push(event.data);
        }
    };

    return {
        start: () => mediaRecorder.start(),
        stop: () =>
            new Promise<Blob>((resolve) => {
                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunks, { type: "video/webm" });
                    resolve(blob);
                };
                mediaRecorder.stop();
                combinedStream.getTracks().forEach((track) => track.stop());
            }),
    };
};


export const downloadBlob = (blob: Blob, filename = "recorded-video.webm") => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
};
