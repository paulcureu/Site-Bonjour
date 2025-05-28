const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

(async () => {
  try {
    await db.query("DELETE FROM menu;");
    console.log("Toate rândurile din 'menu' au fost șterse.");
    db.end();
  } catch (err) {
    console.error("Eroare la ștergere:", err);
  }
})();
