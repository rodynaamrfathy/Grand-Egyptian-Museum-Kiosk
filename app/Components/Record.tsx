export interface Recorder {
    start: () => void;
    stop: () => Promise<Blob>;
}

export const createScreenRecorder = async (): Promise<Recorder> => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
    });

    const mediaRecorder = new MediaRecorder(stream);
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
                stream.getTracks().forEach((track) => track.stop());
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
