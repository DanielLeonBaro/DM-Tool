const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;

// ====== Config ======
app.use(cors());
app.use(express.json());

// carpeta /data (hermana de /backend)
const DATA_DIR = path.join(__dirname, "..", "data");

// asegurar carpeta data
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// ====== Helpers ======
function getNextTrackerId() {
  const files = fs
    .readdirSync(DATA_DIR)
    .filter(f => f.startsWith("tracker-") && f.endsWith(".json"));

  if (files.length === 0) return 1;

  const ids = files.map(f =>
    parseInt(f.replace("tracker-", "").replace(".json", ""))
  );

  return Math.max(...ids) + 1;
}

// ====== Health check ======
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "DM Tool backend running" });
});

// ====== Endpoints ======

// 1️⃣ Crear tracker nuevo
app.post("/api/tracker/new", (req, res) => {
  try {
    const id = getNextTrackerId();
    const filePath = path.join(DATA_DIR, `tracker-${id}.json`);

    const emptyTracker = {
      id,
      createdAt: new Date().toISOString(),
      initiative: [],
      tracker: {
        rows: [],
        rounds: ["Ronda 1"]
      },
      tables: []
    };

    fs.writeFileSync(filePath, JSON.stringify(emptyTracker, null, 2));
    res.json({ success: true, id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create tracker" });
  }
});

// 2️⃣ Guardar tracker existente
app.post("/api/tracker/:id/save", (req, res) => {
  try {
    const { id } = req.params;
    const filePath = path.join(DATA_DIR, `tracker-${id}.json`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Tracker not found" });
    }

    const payload = {
      id: Number(id),
      savedAt: new Date().toISOString(),
      ...req.body
    };

    fs.writeFileSync(filePath, JSON.stringify(payload, null, 2));
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save tracker" });
  }
});

// 3️⃣ Listar trackers
app.get("/api/tracker/list", (req, res) => {
  try {
    const trackers = fs
      .readdirSync(DATA_DIR)
      .filter(f => f.startsWith("tracker-") && f.endsWith(".json"))
      .map(f => {
        const raw = fs.readFileSync(path.join(DATA_DIR, f));
        const json = JSON.parse(raw);
        return {
          id: json.id,
          createdAt: json.createdAt,
          savedAt: json.savedAt || null
        };
      })
      .sort((a, b) => b.id - a.id);

    res.json(trackers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to list trackers" });
  }
});

// 4️⃣ Cargar tracker por ID
app.get("/api/tracker/:id", (req, res) => {
  try {
    const { id } = req.params;
    const filePath = path.join(DATA_DIR, `tracker-${id}.json`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Tracker not found" });
    }

    const data = fs.readFileSync(filePath);
    res.json(JSON.parse(data));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load tracker" });
  }
});

// ====== Start ======
app.listen(PORT, () => {
  console.log(`🧙 Tracker backend running on http://localhost:${PORT}`);
});
