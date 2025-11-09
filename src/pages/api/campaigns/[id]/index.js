import { deleteCampaign, getCampaignById } from "../../../../data/campaigns"
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req, res) {
console.log("req.method: ", req.method)
  switch(req.method) {
    case 'GET': {
        try {
        const response = await getCampaignById()
        return res.status(200).json({
            message: "Successfully fetched campaigns",
            campaigns: response
        });
        } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Failed to fetch campaigns',
            details: error.message
        });
        }
    }

    case 'PATCH': {

    }

    case 'DELETE': {
 
        try {
            console.log("req: ", req.query)
            await deleteCampaign(req.query.id)
            return res.status(200).json({
                message: "Successfully deleted campaign",
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: 'Failed to delete campaigns',
                details: error.message
            });
        }
    }
    default: {
        return res.status(405).json({ error: 'Method not allowed' });
    }
  }
}