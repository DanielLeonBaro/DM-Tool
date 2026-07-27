const express = require("express");
const path = require("path");

const app = express();
const port = Number(process.env.PORT) || 3000;
const publicDirectory = path.join(__dirname, "..", "frontend");

app.disable("x-powered-by");
app.use(express.static(publicDirectory, {
  extensions: ["html"],
  maxAge: process.env.NODE_ENV === "production" ? "1h" : 0
}));

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

const legacySections = {
  "/tracker.html": "combat",
  "/wiki.html": "wiki",
  "/music.html": "music"
};

Object.entries(legacySections).forEach(([route, section]) => {
  app.get(route, (_request, response) => response.redirect(`/#${section}`));
});

app.get("*splat", (_request, response) => {
  response.sendFile(path.join(publicDirectory, "index.html"));
});

app.listen(port, () => {
  console.log(`DM Tool is ready at http://localhost:${port}`);
});
