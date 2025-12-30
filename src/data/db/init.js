import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function initDatabase() {
  let db = await open({
    filename: "../dnd/data/game_data.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS campaigns (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS characters (
      id TEXT PRIMARY KEY,
      is_npc BOOLEAN DEFAULT 0,
      campaign_id TEXT NOT NULL,
      name TEXT NOT NULL,
      portrait TEXT,
      token_image TEXT,
      exp TEXT DEFAULT 0,
      
      race TEXT,
      character_class TEXT NOT NULL,
      subclass TEXT,
      background TEXT,
      backstory TEXT,
      alignment TEXT,

      level INTEGER DEFAULT 1,

      max_hp INTEGER DEFAULT 10,
      current_hp INTEGER DEFAULT 10,
      temp_hp INTEGER DEFAULT 0,
      
      armor_class INTEGER DEFAULT 10,
      speed INTEGER DEFAULT 30,

      initiative_modifier INTEGER DEFAULT 0,

      ability_scores JSON,
      ability_modifiers JSON,
      proficiency_bonus INTEGER,
      saving_throws JSON,
      skills JSON,
      skill_proficiencies JSON,
      spell_save_dc INTEGER,
      spell_attack_bonus INTEGER,
      

      death_saves JSON DEFAULT '{"success":0,"fail":0}',
      conditions JSON DEFAULT '[]',

      inventory JSON DEFAULT '[]',
      spells_known JSON DEFAULT '[]',
      spells_prepared JSON DEFAULT '[]',
      spell_slots JSON DEFAULT '{}',

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(campaign_id) REFERENCES campaigns(id)
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      campaign_id TEXT NOT NULL,
      player_count INTEGER DEFAULT 0,
      connected_users TEXT DEFAULT '[]',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
    );
  `);

  return db;
}