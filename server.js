const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf-8"));

app.get("/banners", (req, res) => res.json(readJson("banners.json")));
app.get("/featured-destination", (req, res) =>
  res.json(readJson("featured-destination.json"))
);
app.get("/contacts", (req, res) => res.json(readJson("contacts.json")));

// Add this endpoint to serve destination-specific JSON
app.get("/destination/:handle", (req, res) => {
  const handle = req.params.handle;
  const filePath = path.join(__dirname, "destinations", `${handle}.json`);

  try {
    const destinationData = require(filePath);
    res.json(destinationData);
  } catch (error) {
    res.status(404).json({ error: "Destination not found" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
