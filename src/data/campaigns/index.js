import { initDatabase } from "../db/init"

export async function createCampaign(campaignData) {
  const db = await initDatabase();
  const { id, name, description } = campaignData;

  await db.run(
    `
    INSERT INTO campaigns (id, name, description, created_at, updated_at)
    VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
  `,
    [id, name, description]
  );

  const newCampaign = await db.get(`SELECT * FROM campaigns WHERE id = ?`, [
    id,
  ]);

  await db.close();
  return newCampaign;
}

export async function getAllCampaigns() {
  const db = await initDatabase();
  const campaigns = await db.all(
    "SELECT * FROM campaigns ORDER BY created_at DESC"
  );
  await db.close();
  return campaigns;
}

export async function getCampaignById(campaignId) {
  const db = await initDatabase();
  const campaign = await db.get("SELECT * FROM campaigns WHERE id = ?", [
    campaignId,
  ]);
  await db.close();
  return campaign;
}

export async function updateCampaign(campaignId, campaignData) {
  const db = await initDatabase();
  const { name, description } = campaignData;

  await db.run(
    `
    UPDATE campaigns
    SET name = ?,
        description = ?,
        updated_at = datetime('now')
    WHERE id = ?
  `,
    [name, description, campaignId]
  );

  await db.close();
}

export async function deleteCampaign(campaignId) {
  const db = await initDatabase();
  await db.run('DELETE FROM campaigns WHERE id = ?', [campaignId]);
  await db.close();
}


