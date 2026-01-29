from fastapi import FastAPI
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import json

app = FastAPI()

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"
DATA_DIR = BASE_DIR / "data"

# Serve frontend as static files
app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="frontend")


@app.get("/api/playlists", response_class=JSONResponse)
def get_playlists():
    with open(DATA_DIR / "playlists.json", "r", encoding="utf-8") as f:
        return json.load(f)