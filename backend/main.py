from fastapi import FastAPI
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
import json
from pathlib import Path
import os

app = FastAPI()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PLAYLISTS_PATH = os.path.join(BASE_DIR, "playlists.json")


@app.get("/", response_class=HTMLResponse)
def home():
    return """
<!DOCTYPE html>
<html lang="es">
   <head>
      <meta charset="UTF-8">
      <title>DM Tool</title>
      <!-- Tailwind CSS CDN -->
      <script src="https://cdn.tailwindcss.com"></script>
      <!-- Custom Tailwind config -->
      <script>
         tailwind.config = {
             theme: {
                 extend: {
                     colors: {
                         gold: '#d4af37'
                     }
                 }
             }
         }
      </script>
   </head>
   
   <body class="bg-neutral-900 text-neutral-100 min-h-screen">
      <!-- Header -->
      <header class="border-b border-neutral-700 p-4 flex items-center justify-between">
         <h1 class="text-2xl font-bold text-gold">
            🧙 DM Tool
         </h1>
         <span class="text-sm text-neutral-400">
         Session Control Panel
         </span>
      </header>
      
      <!-- Main layout -->
      <main class="p-6 grid grid-cols-12 gap-6">
         <!-- Music panel -->
         <section class="col-span-3 bg-neutral-800 rounded-xl p-4 shadow-lg flex flex-col gap-4">
            <h2 class="text-lg font-semibold text-gold">
               🎵 Music
            </h2>
            <!-- Compact Player -->
            <iframe id="music-player" class="w-full aspect-video bg-black rounded-lg shadow-md" src="" allow="autoplay" allowfullscreen></iframe>
            <!-- Music buttons -->
            <div class="grid grid-cols-2 gap-2">
               <button onclick="loadPlaylist('city')" class="bg-neutral-700 hover:bg-neutral-600 rounded-md py-1 text-sm">
                Ciudad
               </button>
               <button onclick="loadPlaylist('combat')" class="bg-neutral-700 hover:bg-neutral-600 rounded-md py-1 text-sm">
                Combate
               </button>
               <button onclick="loadPlaylist('tavern')" class="bg-neutral-700 hover:bg-neutral-600 rounded-md py-1 text-sm">
                Taverna
               </button>
            </div>
         </section>
         
         <!-- Placeholder panel -->
         <section class="col-span-8 bg-neutral-800 rounded-xl p-4 shadow-lg">
            <h2 class="text-xl font-semibold mb-4 text-gold">
               Placeholder Tracker/Wiki
            </h2>
            <!-- YouTube Player -->
         </section>
      </main>
      
      <script>
         // Load YouTube IFrame API
         var tag = document.createElement('script');
         tag.src = "https://www.youtube.com/iframe_api";
         var firstScriptTag = document.getElementsByTagName('script')[0];
         firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
         
         var player;
         
         function onYouTubeIframeAPIReady() {
             player = new YT.Player('player', {
                 height: '100%',
                 width: '100%',
                 videoId: '2b8TKhIz_ZY', // default: ciudad
                 playerVars: {
                     autoplay: 0,
                     controls: 1
                 }
             });
         }
         
         function playVideo(videoId) {
             if (player) {
                 player.loadVideoById(videoId);
             }
         }
      </script>
      
      <script>
         async function loadPlaylist(key) {
           const res = await fetch("/api/playlists");
           const playlists = await res.json();
         
           const player = document.getElementById("music-player");
         
           player.src =
             playlists[key].url +
             "&autoplay=1&loop=1&controls=0";
         }
      </script>
   </body>
</html>
"""



@app.get("/api/playlists", response_class=JSONResponse)
def get_playlists():
    file_path = Path("data/playlists.json")
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

