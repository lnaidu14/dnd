import { getAllCampaigns, createCampaign } from "../../../data/campaigns"
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req, res) {
  console.log("req.method: ", req.method)
  switch (req.method) {
    case "POST": {
      try {
        const { name, description } = req.body;

        if (!name) {
          return res.status(400).json({ error: "Campaign name is required" });
        }

        const id = uuidv4();

        const campaignData = {
          id,
          name,
          description,
        };

        const newCampaign = await createCampaign(campaignData);

        return res.status(201).json({
          message: "Successfully created campaign",
          campaign: newCampaign,
        });
      } catch (err) {
        console.log("err: ", err);
        res.status(500).json({
          success: false,
          error: "Failed to create campaign",
          details: err.message,
        });
      }
    }

    case "GET": {
      try {
        const response = await getAllCampaigns();
        return res.status(200).json({
          message: "Successfully fetched campaigns",
          campaigns: response,
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          error: "Failed to fetch campaigns",
          details: error.message,
        });
      }
    }

    default: {
      return res.status(405).json({ error: "Method not allowed" });
    }
  }
}