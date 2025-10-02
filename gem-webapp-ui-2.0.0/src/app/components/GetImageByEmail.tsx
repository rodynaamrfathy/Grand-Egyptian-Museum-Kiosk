"use client";
import { Mail } from "lucide-react";
import { useState, useEffect } from "react";

interface EmailButtonProps {
  imageUrl: string;
  cardBlob: Blob;
  className?: string;
}

const EmailButton: React.FC<EmailButtonProps> = ({ imageUrl, cardBlob, className }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) setUserEmail(savedEmail);
  }, []);

  const handleEmail = async () => {
    if (!userEmail) {
      alert("No email found. Please enter your email first.");
      return;
    }

    try {
      // For now: dev fallback → save in backend
      const res = await fetch("/api/save-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          image_name: "booth_image.png",
          card_name: "custom_card.png",
          kiosk_name: "Ramses",
          filter_name: "default",
        }),
      });

      if (!res.ok) throw new Error("Failed to save email");

      console.log("✅ Email + images saved to backend:", await res.json());
      alert(`📧 Email ${userEmail} saved (dev mode, no SES yet)`);

      // 🔜 Later replace with SES API call
    } catch (error) {
      console.error("Error preparing email:", error);
      alert("Failed to prepare email.");
    }
  };

  return (
    <button
      onClick={handleEmail}
      className={`w-full rounded-2xl py-4 px-6 shadow-lg hover:shadow-xl 
                  transition-all duration-300 flex items-center justify-center 
                  space-x-3 backdrop-blur bg-white/10 border border-white/20 font-sans ${className || ""}`}
    >
      <Mail className="w-5 h-5 text-white" />
      <span className="text-white font-medium font-sans">
        {userEmail ? `Send to ${userEmail}` : "Send via Email"}
      </span>
    </button>
  );
};

export default EmailButton;
