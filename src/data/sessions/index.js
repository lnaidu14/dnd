export async function getSession(campaignId) {
  const db = await initDatabase();
  const session = await db.get(
    'SELECT * FROM sessions WHERE campaign_id = ?',
    [campaignId]
  );
  await db.close();
  return session;
}


export async function createSession(campaignId, sessionData) {
  const db = await initDatabase();
  const { dm_name, player_count, connected_users } = sessionData;

  await db.run(`
    INSERT INTO sessions 
    (id, campaign_id, dm_name, player_count, connected_users, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
  `, [
    campaignId,
    campaignId,
    dm_name,
    player_count,
    JSON.stringify(connected_users)
  ]);

  await db.close();
}


export async function updateSession(campaignId, sessionData) {
  const db = await initDatabase();
  const {dm_name, player_count, connected_users } = sessionData;

  await db.run(`
    UPDATE sessions
    SET dm_name = ?,
        player_count = ?,
        connected_users = ?,
        updated_at = datetime('now')
    WHERE campaign_id = ?
  `, [
    dm_name,
    player_count,
    JSON.stringify(connected_users),
    campaignId
  ]);

  await db.close();
}


export async function deleteSession(campaignId) {
  const db = await initDatabase();
  await db.run('DELETE FROM sessions WHERE campaign_id = ?', [campaignId]);
  await db.close();
}
