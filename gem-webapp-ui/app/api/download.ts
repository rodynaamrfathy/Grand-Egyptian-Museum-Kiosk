// pages/api/perform-download.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { triggerDownload, firstInput } = req.body;

    if (!triggerDownload || !firstInput) {
      return res.status(400).json({ error: "Missing data" });
    }

    // Do any backend logging, auth checks, analytics, etc. here
    console.log("Triggered backend-side download for:", firstInput);

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
