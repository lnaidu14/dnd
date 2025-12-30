import { getAllCharacters, createCharacter } from "../../../data/characters"
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      try {
        const {
          campaign_id,
          level,
          name,
          character_class,
          race,
          subclass,
          background,
          alignment,
          is_npc,
          ability_scores,
          ability_modifiers,
          proficiency_bonus,
          speed,
          max_hp,
          current_hp,
          backstory,
          spell_save_dc,
          spell_attack_bonus,
          armor_class,
          saving_throws,
          portrait,
          token_image,
          initiative_modifier,
          skills,
          skill_proficiencies,
          exp,
        } = req.body;

        if (!campaign_id || !name || !character_class) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        const id = uuidv4();

        const newCharacter = await createCharacter({
          id,
          campaign_id,
          level,
          name,
          character_class,
          race,
          subclass,
          background,
          alignment,
          is_npc,
          ability_scores,
          ability_modifiers,
          proficiency_bonus,
          speed,
          max_hp,
          current_hp,
          backstory,
          spell_save_dc,
          spell_attack_bonus,
          armor_class,
          saving_throws,
          portrait,
          token_image,
          initiative_modifier,
          skills,
          skill_proficiencies,
          exp,
        });

        console.info("Character created: ", newCharacter);

        return res.status(201).json({
          message: "Successfully created character",
          character: newCharacter,
        });
      } catch (err) {
        console.error("Error occurred when creating character: ", err);
        res.status(500).json({
          success: false,
          error: "Failed to create character",
          details: err.message,
        });
      }
    }

    case "GET": {
      try {
        const { campaignId } = req.query;
        const response = await getAllCharacters(campaignId);
        return res.status(200).json({
          message: "Successfully fetched characters for campaign",
          characters: response,
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          error: "Failed to fetch characters",
          details: error.message,
        });
      }
    }

    default: {
      return res.status(405).json({ error: "Method not allowed" });
    }
  }
}   