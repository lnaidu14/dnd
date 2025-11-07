import { getAllCampaigns, createCampaign } from "../../../data/campaigns"
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req, res) {
  console.log("req.method: ", req.method)
  switch(req.method) {
    case 'POST': {
        try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Campaign name is required' });
        }

        const dmId = uuidv4()
        const id = uuidv4()

        const campaignData = {
           id, dm_id: dmId, name, description
        }

        const newCampaign = await createCampaign(campaignData);


        return res.status(201).json({
            message: "Successfully created campaign",
            campaign: newCampaign
        });
        } catch (err) {
            console.log("err: ", err)
            res.status(500).json({
                success: false,
                error: 'Failed to create campaign',
                details: err.message
            });
        }
    }
    
    case 'GET': {
        try {
        const response = await getAllCampaigns()
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

    }
    default: {
        return res.status(405).json({ error: 'Method not allowed' });
    }
  }

  try {
    const db = await initDatabase();
    const campaignId = generateUUID();
    const now = new Date().toISOString();

    await db.run(
      `INSERT INTO campaigns (id, name, description, dm_id, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [campaignId, name, description || '', 'current_user', now, now]
    );

    await db.close();

    res.status(200).json({
      success: true,
      campaign: {
        id: campaignId,
        name,
        description: description || '',
        dm_id: 'current_user',
        created_at: now,
        updated_at: now
      }
    });
  } catch (error) {
    console.error('Campaign creation failed:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create campaign',
      details: error.message
    });
  }
}