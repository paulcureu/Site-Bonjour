const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM menu");
    res.json(result.rows);
  } catch (err) {
    console.error("Eroare la GET /menu:", err);
    res.status(500).json({ error: "Eroare la interogare meniu" });
  }
});

module.exports = router;
