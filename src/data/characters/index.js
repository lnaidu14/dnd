import { initDatabase } from "../db/init"

export async function createCharacter(characterData) {
  const db = await initDatabase();

  const defaultJson = JSON.stringify({});
  const emptyArray = JSON.stringify([]);

  await db.run(
    `INSERT INTO characters
        (id, campaign_id, name, character_class, race, subclass, background, alignment, is_npc,
        ability_scores, saving_throws, skills, death_saves, conditions, inventory, spells_known, spells_prepared, spell_slots,
        level, max_hp, current_hp, backstory, spell_save_dc, spell_attack_bonus, armor_class, portrait, token_image, initiative_modifier, ability_modifiers, proficiency_bonus,
        skill_proficiencies)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      characterData.id,
      characterData.campaign_id,
      characterData.name,
      characterData.character_class,
      characterData.race || "",
      characterData.subclass || "",
      characterData.background || "",
      characterData.alignment || "",
      characterData.is_npc ? 1 : 0,
      JSON.stringify(characterData.ability_scores),
      JSON.stringify(characterData.saving_throws),
      JSON.stringify(characterData.skills),
      '{"success":0,"fail":0}',
      emptyArray,
      emptyArray,
      emptyArray,
      emptyArray,
      defaultJson,
      characterData.level,
      characterData.max_hp,
      characterData.current_hp,
      characterData.backstory,
      characterData.spell_save_dc,
      characterData.spell_attack_bonus,
      characterData.armor_class,
      characterData.portrait,
      characterData.token_image,
      characterData.initiative_modifier,
      JSON.stringify(characterData.ability_modifiers),
      characterData.proficiency_bonus,
      JSON.stringify(characterData.skill_proficiencies),
    ]
  );

  const newCharacter = await db.get(`SELECT * FROM characters WHERE id = ?`, [
    characterData.id,
  ]);

  await db.close();
  return newCharacter;
}

export async function getAllCharacters(campaignId) {
  const db = await initDatabase();
  const characters = await db.all(
    "SELECT * FROM characters WHERE campaign_id = ?",
    [campaignId]
  );
  await db.close();
  return characters;
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


