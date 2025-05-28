const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express(); // ← aici definim `app`

// Middleware-uri globale
app.use(cors());
app.use(express.json());

// Import rute
const menuRoutes = require("./routes/menu");

// Folosim rutele
app.use("/menu", menuRoutes);

// Pornim serverul
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
