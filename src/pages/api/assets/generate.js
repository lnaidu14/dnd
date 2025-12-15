import axios from "axios"

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const background = req.query.background;

        const prompt = background
            .toLowerCase()
            .replace(/[^\w\s]/g, "")
            .trim()
            .replace(/\s+/g, "_");

        const imageUrl = `https://pollinations.ai/p/${prompt}`;

        const response = await axios.get(imageUrl, {
            responseType: "arraybuffer",
        });

        // 🔑 Send image directly
        res.setHeader("Content-Type", "image/jpeg");
        res.send(response.data);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to generate asset",
            details: error.message,
        });
    }
}