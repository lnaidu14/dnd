const { initDatabase } = require('../src/data/db/init');
const { mkdir } = require('fs/promises');

async function setup() {
  try {
    await mkdir('./data', { recursive: true });
    
    const db = await initDatabase();
    console.log('Database initialized successfully');
    
    await db.close();
    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

setup();