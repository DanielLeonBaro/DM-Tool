const STORAGE_KEY = "dm-tool:v2";

const sections = {
  combat: {
    label: "Combat",
    subtitle: "Initiative and encounter state",
    icon: "swords"
  },
  wiki: {
    label: "Wiki",
    subtitle: "People, places, events, and notes",
    icon: "book"
  },
  music: {
    label: "Music",
    subtitle: "Soundtracks and ambience",
    icon: "music"
  }
};

const icons = {
  swords: '<path d="m14.5 17.5-10-10V4h3.5l10 10m-1 4 2 2m-2-6 3-3m-9.5 6.5 10-10V4H17L7 14m0 4-2 2m2-6-3-3"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V5a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 5.5v14Z"/><path d="M8 7h8M8 11h6"/>',
  music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  play: '<path d="m8 5 11 7-11 7V5Z"/>',
  next: '<path d="m9 18 6-6-6-6"/><path d="M19 6v12"/>',
  previous: '<path d="m15 18-6-6 6-6"/><path d="M5 6v12"/>',
  refresh: '<path d="M20 7h-5V2"/><path d="M20 7a9 9 0 1 0 2 7"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1.1-1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.8-7.6 1.1-1a5.5 5.5 0 0 0-.1-7.8Z"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>',
  download: '<path d="M12 3v12m0 0 5-5m-5 5-5-5"/><path d="M5 21h14"/>',
  upload: '<path d="M12 17V5m0 0 5 5m-5-5-5 5"/><path d="M5 21h14"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
  x: '<path d="m18 6-12 12M6 6l12 12"/>',
  external: '<path d="M15 3h6v6M10 14 21 3"/><path d="M18 13v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h7"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  tag: '<path d="M20.6 13.6 11 4H4v7l9.6 9.6a2 2 0 0 0 2.8 0l4.2-4.2a2 2 0 0 0 0-2.8Z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
  volume: '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>'
};

function icon(name, className = "icon") {
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || ""}</svg>`;
}

function createEncounter(name = "New combat") {
  const timestamp = new Date().toISOString();
  return {
    id: uid(),
    name,
    createdAt: timestamp,
    updatedAt: timestamp,
    round: 1,
    roundCount: 1,
    activeId: null,
    started: false,
    combatants: []
  };
}

function createDefaultState() {
  const encounter = createEncounter();
  return {
    version: 3,
    combat: {
      activeEncounterId: encounter.id,
      encounters: [encounter],
      library: []
    },
    wiki: {
      selectedId: null,
      pages: []
    },
    music: {
      selectedId: null,
      sources: []
    }
  };
}

function normalizeCombatant(combatant) {
  return {
    ...combatant,
    id: combatant.id || uid(),
    conditions: Array.isArray(combatant.conditions) ? combatant.conditions : [],
    roundNotes: combatant.roundNotes && typeof combatant.roundNotes === "object"
      ? combatant.roundNotes
      : {}
  };
}

function normalizeEncounter(encounter) {
  const timestamp = encounter.createdAt || new Date().toISOString();
  return {
    ...createEncounter(encounter.name || "Untitled combat"),
    ...encounter,
    id: encounter.id || uid(),
    name: encounter.name || "Untitled combat",
    createdAt: timestamp,
    updatedAt: encounter.updatedAt || timestamp,
    round: Math.max(1, Number(encounter.round) || 1),
    roundCount: Math.max(1, Number(encounter.roundCount) || Number(encounter.round) || 1),
    combatants: Array.isArray(encounter.combatants)
      ? encounter.combatants.map(normalizeCombatant)
      : []
  };
}

function loadState(candidate) {
  const defaults = createDefaultState();
  try {
    const saved = candidate || JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return defaults;
    let encounters;
    let activeEncounterId;
    if (Array.isArray(saved.combat?.encounters) && saved.combat.encounters.length) {
      encounters = saved.combat.encounters.map(normalizeEncounter);
      activeEncounterId = encounters.some((encounter) => encounter.id === saved.combat.activeEncounterId)
        ? saved.combat.activeEncounterId
        : encounters[0].id;
    } else if (saved.combat && Array.isArray(saved.combat.combatants)) {
      const migrated = normalizeEncounter({
        ...saved.combat,
        name: saved.combat.name || "First combat"
      });
      encounters = [migrated];
      activeEncounterId = migrated.id;
    } else {
      encounters = defaults.combat.encounters;
      activeEncounterId = defaults.combat.activeEncounterId;
    }

    return {
      ...defaults,
      ...saved,
      combat: {
        ...defaults.combat,
        activeEncounterId,
        encounters,
        library: Array.isArray(saved.combat?.library)
          ? saved.combat.library.map((character) => ({ ...character, id: character.id || uid() }))
          : []
      },
      wiki: {
        ...defaults.wiki,
        ...saved.wiki,
        pages: Array.isArray(saved.wiki?.pages) ? saved.wiki.pages : []
      },
      music: {
        ...defaults.music,
        ...saved.music,
        sources: Array.isArray(saved.music?.sources) ? saved.music.sources : []
      }
    };
  } catch {
    return defaults;
  }
}

let state = loadState();
const ui = {
  section: getSectionFromHash(),
  wikiSearch: "",
  wikiCategory: "",
  wikiTag: "",
  wikiMode: "edit",
  musicSearch: "",
  musicCategory: "",
  confirmCallback: null,
  saveTimer: null
};

function getSectionFromHash() {
  const section = window.location.hash.slice(1);
  return sections[section] ? section : "combat";
}

function uid() {
  return globalThis.crypto?.randomUUID?.() ||
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function saveState(message) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (message) showToast(message);
}

function saveSoon() {
  window.clearTimeout(ui.saveTimer);
  const status = document.querySelector("#save-status");
  if (status) status.textContent = "Saving…";
  ui.saveTimer = window.setTimeout(() => {
    saveState();
    const currentStatus = document.querySelector("#save-status");
    if (currentStatus) currentStatus.textContent = "Saved";
  }, 250);
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.remove("translate-y-3", "opacity-0");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.add("translate-y-3", "opacity-0");
  }, 1800);
}

function hydrateShell() {
  document.querySelectorAll("[data-section-link]").forEach((link) => {
    const section = sections[link.dataset.sectionLink];
    if (link.classList.contains("mobile-nav")) {
      link.innerHTML = `${icon(section.icon)}<span>${section.label}</span>`;
    } else {
      link.innerHTML = `${icon(section.icon)}<span>${section.label}</span>`;
    }
  });
  document.querySelector('[data-action="toggle-menu"]').innerHTML =
    `${icon("settings")}<span>Data & settings</span>${icon("more", "icon ml-auto")}`;
  document.querySelector('[data-action="export-data"]').innerHTML =
    `${icon("download")}<span>Export data</span>`;
  document.querySelector('[data-action="import-data"]').innerHTML =
    `${icon("upload")}<span>Import data</span>`;
  document.querySelector('[data-action="reset-data"]').innerHTML =
    `${icon("trash")}<span>Reset all data</span>`;
}

function render() {
  ui.section = getSectionFromHash();
  const section = sections[ui.section];
  document.title = `${section.label} · DM Tool`;
  document.querySelector("#page-title").textContent = section.label;
  document.querySelector("#page-subtitle").textContent = section.subtitle;
  document.querySelectorAll("[data-section-link]").forEach((link) => {
    link.classList.toggle("active", link.dataset.sectionLink === ui.section);
  });

  if (ui.section === "combat") renderCombat();
  if (ui.section === "wiki") renderWiki();
  if (ui.section === "music") renderMusic();
}

function setHeaderActions(html) {
  document.querySelector("#header-actions").innerHTML =
    `${html}<button class="icon-button lg:hidden" data-action="toggle-menu" aria-label="Data and settings">${icon("more")}</button>`;
}

function getActiveEncounter() {
  let encounter = state.combat.encounters.find((item) => item.id === state.combat.activeEncounterId);
  if (!encounter) {
    encounter = state.combat.encounters[0] || createEncounter();
    if (!state.combat.encounters.length) state.combat.encounters.push(encounter);
    state.combat.activeEncounterId = encounter.id;
  }
  return encounter;
}

function touchEncounter(encounter = getActiveEncounter()) {
  encounter.updatedAt = new Date().toISOString();
}

function renderCombat() {
  const encounter = getActiveEncounter();
  const combatants = [...encounter.combatants].sort((a, b) =>
    Number(b.initiative || 0) - Number(a.initiative || 0)
  );
  const active = combatants.find((combatant) => combatant.id === encounter.activeId);

  setHeaderActions(`
    <button class="button-secondary hidden sm:inline-flex" data-action="manage-library">${icon("user")} Presets</button>
    <button class="button-secondary hidden md:inline-flex" data-action="new-encounter">${icon("plus")} New combat</button>
    ${encounter.started ? `<button class="button-secondary hidden lg:inline-flex" data-action="previous-turn">${icon("previous")} Previous</button>` : ""}
    <button class="button-primary" data-action="${encounter.started ? "next-turn" : "start-combat"}" ${combatants.length ? "" : "disabled"}>
      ${icon(encounter.started ? "next" : "play")}
      <span>${encounter.started ? "Next turn" : "Start"}</span>
    </button>
  `);

  document.querySelector("#app").innerHTML = `
    <div class="mx-auto max-w-[1500px] space-y-4 lg:space-y-5">
      <section class="panel flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <div class="flex min-w-0 flex-1 items-center gap-3">
          <label class="min-w-0 flex-1 sm:max-w-sm">
            <span class="mb-1 block text-[10px] font-medium uppercase tracking-[.13em] text-stone-500">Combat history</span>
            <select id="encounter-selector" class="field h-10 px-3 text-xs">
              ${[...state.combat.encounters]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((item) => `<option value="${item.id}" ${item.id === encounter.id ? "selected" : ""}>${escapeHtml(item.name)} — ${formatEncounterDate(item.createdAt)}</option>`)
                .join("")}
            </select>
          </label>
          <label class="hidden min-w-0 flex-1 sm:block">
            <span class="mb-1 block text-[10px] font-medium uppercase tracking-[.13em] text-stone-500">Combat name</span>
            <input class="field h-10 px-3 text-xs" data-encounter-field="name" value="${escapeHtml(encounter.name)}" aria-label="Combat name">
          </label>
        </div>
        <div class="flex items-center gap-2 sm:self-end">
          <button class="button-secondary sm:hidden" data-action="manage-library">${icon("user")} Presets</button>
          <button class="button-secondary md:hidden" data-action="new-encounter">${icon("plus")} New</button>
          <button class="icon-button" data-action="delete-encounter" aria-label="Delete this combat" ${state.combat.encounters.length === 1 ? "disabled" : ""}>${icon("trash")}</button>
        </div>
      </section>

      <section class="grid grid-cols-2 gap-3 lg:grid-cols-4">
        ${statCard("Round", encounter.round, "refresh")}
        ${statCard("Combatants", combatants.length, "user")}
        ${statCard("Current turn", active?.name || "—", "play", true)}
        ${statCard("Character presets", state.combat.library.length, "user")}
      </section>

      ${state.combat.library.length ? `
        <section class="panel overflow-hidden">
          <div class="flex items-center justify-between border-b border-white/[.07] px-4 py-3 sm:px-5">
            <div>
              <h2 class="text-sm font-semibold text-parchment">Quick add</h2>
              <p class="mt-0.5 text-[11px] text-stone-500">Enter initiative only</p>
            </div>
            <button class="button-secondary" data-action="manage-library">${icon("edit")} Manage</button>
          </div>
          <div class="grid gap-2 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            ${state.combat.library.map(renderPresetQuickAdd).join("")}
          </div>
        </section>
      ` : ""}

      <section class="panel p-3 sm:p-4">
        <form class="grid gap-2 sm:grid-cols-[minmax(180px,1fr)_82px_92px_82px_auto]" data-form="add-combatant">
          <label class="sr-only" for="combatant-name">Name</label>
          <input id="combatant-name" class="field h-10 px-3 text-sm" name="name" placeholder="Combatant name" autocomplete="off" required>
          <label class="sr-only" for="combatant-initiative">Initiative</label>
          <input id="combatant-initiative" class="field h-10 px-3 text-sm" name="initiative" type="number" placeholder="Init" inputmode="numeric">
          <label class="sr-only" for="combatant-hp">Hit points</label>
          <input id="combatant-hp" class="field h-10 px-3 text-sm" name="hp" type="number" min="0" placeholder="HP" inputmode="numeric">
          <label class="sr-only" for="combatant-ac">Armor class</label>
          <input id="combatant-ac" class="field h-10 px-3 text-sm" name="ac" type="number" min="0" placeholder="AC" inputmode="numeric">
          <button class="button-primary h-10" type="submit">${icon("plus")} Add</button>
        </form>
      </section>

      <section class="panel overflow-hidden">
        <div class="flex items-center justify-between border-b border-white/[.07] px-4 py-3.5 sm:px-5">
          <div>
            <h2 class="text-sm font-semibold text-parchment">Initiative</h2>
            <p class="mt-0.5 text-[11px] text-stone-500">${combatants.length ? "Highest first" : "No combatants"}</p>
          </div>
          <div class="flex items-center gap-2">
            ${encounter.started ? `<span class="rounded-full border border-amber/20 bg-amber/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.13em] text-amber">Live</span>` : ""}
          </div>
        </div>
        <div id="combat-list" class="${combatants.length ? "divide-y divide-white/[.055]" : ""}">
          ${combatants.length ? combatants.map((combatant) => renderCombatant(combatant, encounter)).join("") : renderCombatEmpty()}
        </div>
      </section>

      ${combatants.length ? renderRoundNotes(encounter, combatants) : ""}
    </div>
  `;
}

function renderPresetQuickAdd(character) {
  return `
    <form class="flex items-center gap-2 rounded-xl border border-white/[.07] bg-white/[.02] p-2.5" data-form="add-saved-character" data-id="${character.id}">
      <div class="min-w-0 flex-1">
        <p class="truncate text-xs font-semibold text-stone-300">${escapeHtml(character.name)}</p>
        <p class="mt-1 text-[10px] uppercase tracking-[.1em] text-stone-600">${escapeHtml(character.type || "Player")} · HP ${Number(character.maxHp || 0)} · AC ${Number(character.ac || 0)}</p>
      </div>
      <input class="field h-8 !w-16 shrink-0 px-2 text-center text-xs" name="initiative" type="number" placeholder="Init" required aria-label="Initiative for ${escapeHtml(character.name)}">
      <button class="icon-button border border-white/[.08]" type="submit" aria-label="Add ${escapeHtml(character.name)}">${icon("plus")}</button>
    </form>
  `;
}

function renderRoundNotes(encounter, combatants) {
  const rounds = Array.from({ length: Math.max(encounter.round, encounter.roundCount || 1) }, (_, index) => index + 1);
  return `
    <section class="panel overflow-hidden">
      <div class="flex items-center justify-between border-b border-white/[.07] px-4 py-3.5 sm:px-5">
        <div>
          <h2 class="text-sm font-semibold text-parchment">Round notes</h2>
          <p class="mt-0.5 text-[11px] text-stone-500">What each combatant did on their turn</p>
        </div>
        <span class="rounded-full border border-amber/20 bg-amber/[.07] px-2.5 py-1 text-[10px] font-semibold text-amber">Round ${encounter.round}</span>
      </div>
      <div class="overflow-x-auto">
        <table class="round-table w-full border-collapse text-left">
          <thead>
            <tr>
              <th class="sticky left-0 z-20 min-w-[170px] border-b border-r border-white/[.07] bg-[#15171c] px-4 py-3 text-[10px] font-semibold uppercase tracking-[.12em] text-stone-500">Combatant</th>
              ${rounds.map((round) => `
                <th class="min-w-[220px] border-b border-r border-white/[.07] px-3 py-3 text-[10px] font-semibold uppercase tracking-[.12em] ${round === encounter.round ? "bg-amber/[.06] text-amber" : "bg-[#15171c] text-stone-500"}">Round ${round}</th>
              `).join("")}
            </tr>
          </thead>
          <tbody>
            ${combatants.map((combatant) => `
              <tr>
                <th class="sticky left-0 z-10 border-b border-r border-white/[.06] ${combatant.id === encounter.activeId ? "bg-[#211c14] text-amber" : "bg-panel text-stone-300"} px-4 py-3 text-xs font-semibold">${escapeHtml(combatant.name)}</th>
                ${rounds.map((round) => `
                  <td class="border-b border-r border-white/[.06] p-2 ${round === encounter.round ? "bg-amber/[.025]" : ""}">
                    <textarea class="round-note min-h-[72px] w-full resize-none rounded-lg bg-transparent p-2 text-xs leading-5 text-stone-300 outline-none placeholder:text-stone-700 focus:bg-white/[.025]" data-round-note data-id="${combatant.id}" data-round="${round}" placeholder="${round === encounter.round ? "Turn notes…" : ""}">${escapeHtml(combatant.roundNotes?.[round] || "")}</textarea>
                  </td>
                `).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function statCard(label, value, iconName, truncate = false) {
  return `
    <div class="panel flex min-h-[84px] items-center gap-3 p-4">
      <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/[.07] bg-white/[.03] text-amber">${icon(iconName)}</span>
      <span class="min-w-0">
        <span class="block text-[10px] font-medium uppercase tracking-[.14em] text-stone-500">${label}</span>
        <span class="mt-1 block ${truncate ? "truncate" : ""} text-base font-semibold text-stone-200">${escapeHtml(value)}</span>
      </span>
    </div>
  `;
}

function renderCombatant(combatant, encounter = getActiveEncounter()) {
  const hp = Number(combatant.hp || 0);
  const maxHp = Math.max(Number(combatant.maxHp || 0), 0);
  const percentage = maxHp ? Math.max(0, Math.min(100, (hp / maxHp) * 100)) : 0;
  const isActive = combatant.id === encounter.activeId;
  const conditions = Array.isArray(combatant.conditions) ? combatant.conditions : [];

  return `
    <article class="combat-row ${isActive ? "is-active" : ""} px-4 py-4 sm:px-5" data-id="${combatant.id}">
      <div class="grid gap-4 xl:grid-cols-[minmax(190px,1.3fr)_88px_220px_88px_minmax(210px,1fr)_32px] xl:items-center">
        <div class="flex min-w-0 items-center gap-3">
          <button class="grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${isActive ? "border-amber/35 bg-amber/10 text-amber" : "border-white/[.08] bg-white/[.025] text-stone-500"} text-xs font-bold" data-action="set-active" data-id="${combatant.id}" aria-label="Set active">
            ${Number(combatant.initiative || 0)}
          </button>
          <div class="min-w-0">
            <input class="w-full truncate bg-transparent text-sm font-semibold text-stone-200 outline-none focus:text-parchment" data-combat-field="name" data-id="${combatant.id}" value="${escapeHtml(combatant.name)}" aria-label="Combatant name">
            <select class="mt-1 bg-transparent text-[10px] font-medium uppercase tracking-[.12em] text-stone-500 outline-none" data-combat-field="type" data-id="${combatant.id}" aria-label="Combatant type">
              ${["Player", "Ally", "Enemy", "Other"].map((type) => `<option value="${type}" ${combatant.type === type ? "selected" : ""}>${type}</option>`).join("")}
            </select>
          </div>
        </div>

        <label class="flex items-center justify-between gap-3 xl:block">
          <span class="text-[10px] font-medium uppercase tracking-[.12em] text-stone-500 xl:block">Initiative</span>
          <input class="field h-8 w-20 px-2 text-center text-xs xl:mt-1" data-combat-field="initiative" data-id="${combatant.id}" type="number" value="${Number(combatant.initiative || 0)}" aria-label="Initiative">
        </label>

        <div>
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-medium uppercase tracking-[.12em] text-stone-500">Hit points</span>
            <div class="flex items-center gap-1.5">
              <button class="icon-button !h-7 !w-7 border border-white/[.07]" data-action="adjust-hp" data-id="${combatant.id}" data-delta="-1" aria-label="Subtract one hit point">−</button>
              <div class="flex items-center text-xs">
                <input class="w-10 bg-transparent text-right font-semibold text-stone-200 outline-none" data-combat-field="hp" data-id="${combatant.id}" type="number" value="${hp}" aria-label="Current hit points">
                <span class="px-1 text-stone-600">/</span>
                <input class="w-10 bg-transparent text-stone-400 outline-none" data-combat-field="maxHp" data-id="${combatant.id}" type="number" min="0" value="${maxHp}" aria-label="Maximum hit points">
              </div>
              <button class="icon-button !h-7 !w-7 border border-white/[.07]" data-action="adjust-hp" data-id="${combatant.id}" data-delta="1" aria-label="Add one hit point">+</button>
            </div>
          </div>
          <div class="hp-bar mt-2"><span class="${percentage <= 30 ? "low" : ""}" style="width:${percentage}%"></span></div>
        </div>

        <label class="flex items-center justify-between gap-3 xl:block">
          <span class="flex items-center gap-1 text-[10px] font-medium uppercase tracking-[.12em] text-stone-500">${icon("shield", "h-3 w-3")} AC</span>
          <input class="field h-8 w-20 px-2 text-center text-xs xl:mt-1" data-combat-field="ac" data-id="${combatant.id}" type="number" min="0" value="${Number(combatant.ac || 0)}" aria-label="Armor class">
        </label>

        <div class="min-w-0">
          <span class="text-[10px] font-medium uppercase tracking-[.12em] text-stone-500 xl:hidden">Conditions</span>
          <div class="mt-1 flex min-h-8 flex-wrap items-center gap-1 xl:mt-0">
            ${conditions.map((condition, index) => `
              <button class="rounded-md border border-amber/15 bg-amber/[.07] px-2 py-1 text-[10px] font-medium text-[#d6b47e] hover:bg-amber/10" data-action="remove-condition" data-id="${combatant.id}" data-index="${index}" title="Remove condition">
                ${escapeHtml(condition)} <span class="ml-1 opacity-50">×</span>
              </button>
            `).join("")}
            <form class="min-w-[80px] flex-1" data-form="add-condition" data-id="${combatant.id}">
              <input class="h-7 w-full bg-transparent px-1 text-xs text-stone-300 outline-none placeholder:text-stone-600" name="condition" placeholder="+ condition" autocomplete="off" aria-label="Add condition">
            </form>
          </div>
        </div>

        <button class="icon-button" data-action="remove-combatant" data-id="${combatant.id}" aria-label="Remove ${escapeHtml(combatant.name)}">${icon("trash")}</button>
      </div>
    </article>
  `;
}

function renderCombatEmpty() {
  return `
    <div class="empty-illustration flex min-h-[290px] flex-col items-center justify-center px-6 text-center">
      <span class="grid h-12 w-12 place-items-center rounded-xl border border-white/[.08] bg-[#15171c] text-stone-500">${icon("swords", "h-5 w-5")}</span>
      <h3 class="mt-4 text-sm font-semibold text-stone-300">No combatants yet</h3>
      <p class="mt-1 max-w-xs text-xs leading-5 text-stone-500">Add a name, initiative, HP, and AC above.</p>
    </div>
  `;
}

function addCombatant(form) {
  const encounter = getActiveEncounter();
  const data = new FormData(form);
  const hp = Math.max(0, Number(data.get("hp")) || 0);
  encounter.combatants.push({
    id: uid(),
    name: String(data.get("name") || "").trim(),
    initiative: Number(data.get("initiative")) || 0,
    hp,
    maxHp: hp,
    ac: Math.max(0, Number(data.get("ac")) || 0),
    type: "Enemy",
    conditions: [],
    roundNotes: {}
  });
  encounter.combatants.sort((a, b) => b.initiative - a.initiative);
  encounter.started = false;
  encounter.activeId = null;
  touchEncounter(encounter);
  saveState();
  renderCombat();
  document.querySelector("#combatant-name")?.focus();
}

function stepTurn(direction) {
  const encounter = getActiveEncounter();
  const combatants = [...encounter.combatants].sort((a, b) => b.initiative - a.initiative);
  if (!combatants.length) return;
  const currentIndex = combatants.findIndex((combatant) => combatant.id === encounter.activeId);

  if (!encounter.started || currentIndex < 0) {
    encounter.started = true;
    encounter.round = 1;
    encounter.activeId = combatants[0].id;
  } else {
    const nextIndex = (currentIndex + direction + combatants.length) % combatants.length;
    if (direction > 0 && nextIndex === 0) encounter.round += 1;
    if (direction < 0 && currentIndex === 0 && encounter.round > 1) encounter.round -= 1;
    encounter.activeId = combatants[nextIndex].id;
  }
  encounter.roundCount = Math.max(encounter.roundCount || 1, encounter.round);
  touchEncounter(encounter);
  saveState();
  renderCombat();
}

function formatEncounterDate(value) {
  return new Date(value).toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function renderWiki() {
  let selected = state.wiki.pages.find((page) => page.id === state.wiki.selectedId);
  if (!selected && state.wiki.pages.length) {
    selected = state.wiki.pages[0];
    state.wiki.selectedId = selected.id;
  }

  setHeaderActions(`
    <button class="button-primary" data-action="new-page">${icon("plus")}<span>New note</span></button>
  `);

  document.querySelector("#app").innerHTML = `
    <div class="mx-auto grid min-h-full max-w-[1500px] gap-4 lg:grid-cols-[310px_minmax(0,1fr)] lg:gap-5">
      <aside class="panel flex min-h-[320px] flex-col overflow-hidden lg:min-h-0">
        <div class="space-y-2 border-b border-white/[.07] p-3">
          <label class="relative block">
            ${icon("search", "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-600")}
            <input id="wiki-search" class="field h-10 pl-9 pr-3 text-xs" placeholder="Search notes" value="${escapeHtml(ui.wikiSearch)}" autocomplete="off">
          </label>
          <div class="grid grid-cols-2 gap-2">
            <select id="wiki-category-filter" class="field h-9 px-2 text-[11px]" aria-label="Filter by category">
              <option value="">All categories</option>
              ${getWikiCategories().map((category) => `<option value="${escapeHtml(category)}" ${ui.wikiCategory === category ? "selected" : ""}>${escapeHtml(category)}</option>`).join("")}
            </select>
            <select id="wiki-tag-filter" class="field h-9 px-2 text-[11px]" aria-label="Filter by tag">
              <option value="">All tags</option>
              ${getWikiTags().map((tag) => `<option value="${escapeHtml(tag)}" ${ui.wikiTag === tag ? "selected" : ""}>${escapeHtml(tag)}</option>`).join("")}
            </select>
          </div>
        </div>
        <div id="wiki-list" class="max-h-[340px] flex-1 overflow-y-auto p-2 lg:max-h-none">
          ${renderWikiList()}
        </div>
      </aside>

      <section class="panel min-h-[560px] overflow-hidden">
        ${selected ? renderWikiEditor(selected) : renderWikiEmpty()}
      </section>
    </div>
  `;
}

function renderWikiList() {
  const query = ui.wikiSearch.trim().toLowerCase();
  const pages = [...state.wiki.pages]
    .filter((page) => !query || [page.title, page.category, page.tags, page.body].some((value) =>
      String(value || "").toLowerCase().includes(query)
    ))
    .filter((page) => !ui.wikiCategory ||
      String(page.category || "").toLowerCase() === ui.wikiCategory.toLowerCase()
    )
    .filter((page) => !ui.wikiTag ||
      getPageTags(page).some((tag) => tag.toLowerCase() === ui.wikiTag.toLowerCase())
    )
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  if (!pages.length) {
    const filtered = query || ui.wikiCategory || ui.wikiTag;
    return `
      <div class="flex min-h-48 flex-col items-center justify-center px-5 text-center">
        ${icon(filtered ? "search" : "book", "h-5 w-5 text-stone-600")}
        <p class="mt-3 text-xs font-medium text-stone-400">${filtered ? "No matches" : "No notes yet"}</p>
      </div>
    `;
  }

  return pages.map((page) => `
    <button class="note-list-item ${page.id === state.wiki.selectedId ? "active" : ""} mb-1 w-full rounded-lg p-3 text-left" data-action="select-page" data-id="${page.id}">
      <span class="block truncate text-xs font-semibold text-stone-300">${escapeHtml(page.title || "Untitled")}</span>
      <span class="mt-1.5 flex items-center justify-between gap-2">
        <span class="truncate text-[10px] font-medium uppercase tracking-[.11em] text-stone-600">${escapeHtml(page.category || "Note")}</span>
        <span class="shrink-0 text-[10px] text-stone-600">${formatRelativeDate(page.updatedAt)}</span>
      </span>
    </button>
  `).join("");
}

function renderWikiEditor(page) {
  return `
    <div class="flex h-full min-h-[560px] flex-col">
      <div class="flex items-center justify-between border-b border-white/[.07] px-4 py-3 sm:px-6">
        <span id="save-status" class="text-[10px] font-medium uppercase tracking-[.12em] text-stone-600">Saved</span>
        <div class="flex items-center gap-1">
          <button class="${ui.wikiMode === "edit" ? "button-secondary !bg-white/[.07] !text-parchment" : "button-secondary"} !min-h-8 !px-2.5" data-action="wiki-mode" data-mode="edit">${icon("edit")} Edit</button>
          <button class="${ui.wikiMode === "preview" ? "button-secondary !bg-white/[.07] !text-parchment" : "button-secondary"} !min-h-8 !px-2.5" data-action="wiki-mode" data-mode="preview">${icon("book")} Preview</button>
          <button class="icon-button ml-1" data-action="delete-page" data-id="${page.id}" aria-label="Delete note">${icon("trash")}</button>
        </div>
      </div>
      <div class="flex-1 px-4 py-5 sm:px-6 sm:py-7 lg:px-10">
        <input class="w-full bg-transparent text-2xl font-semibold tracking-tight text-parchment outline-none placeholder:text-stone-700 sm:text-3xl" data-wiki-field="title" data-id="${page.id}" value="${escapeHtml(page.title)}" placeholder="Untitled note" autocomplete="off">
        <div class="mt-5 grid gap-3 border-b border-white/[.07] pb-5 sm:grid-cols-2">
          <label class="flex items-center gap-2">
            ${icon("list", "h-4 w-4 text-stone-600")}
            <input class="w-full bg-transparent text-xs text-stone-400 outline-none placeholder:text-stone-650" data-wiki-field="category" data-id="${page.id}" value="${escapeHtml(page.category)}" placeholder="Category">
          </label>
          <label class="flex items-center gap-2">
            ${icon("tag", "h-4 w-4 text-stone-600")}
            <input class="w-full bg-transparent text-xs text-stone-400 outline-none placeholder:text-stone-650" data-wiki-field="tags" data-id="${page.id}" value="${escapeHtml(page.tags)}" placeholder="Tags, comma separated">
          </label>
        </div>
        ${ui.wikiMode === "edit"
          ? `<textarea class="mt-6 min-h-[360px] w-full resize-none bg-transparent text-sm leading-7 text-stone-300 outline-none placeholder:text-stone-700" data-wiki-field="body" data-id="${page.id}" placeholder="Write anything…">${escapeHtml(page.body)}</textarea>`
          : `<div class="wiki-preview mt-6 min-h-[360px] text-sm leading-7 text-stone-300">${renderLinkedWikiBody(page)}</div>`
        }
      </div>
    </div>
  `;
}

function getPageTags(page) {
  return String(page.tags || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function uniqueSorted(values) {
  return [...new Map(values.filter(Boolean).map((value) => [value.toLowerCase(), value])).values()]
    .sort((a, b) => a.localeCompare(b));
}

function getWikiCategories() {
  return uniqueSorted(state.wiki.pages.map((page) => String(page.category || "").trim()));
}

function getWikiTags() {
  return uniqueSorted(state.wiki.pages.flatMap(getPageTags));
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderLinkedWikiBody(page) {
  const references = state.wiki.pages
    .filter((candidate) => candidate.id !== page.id && candidate.title.trim())
    .sort((a, b) => b.title.length - a.title.length);
  if (!page.body.trim()) {
    return '<p class="text-stone-600">Nothing written yet.</p>';
  }
  if (!references.length) return escapeHtml(page.body);

  const referenceByTitle = new Map(references.map((reference) => [
    reference.title.toLowerCase(),
    reference
  ]));
  const alternatives = references.map((reference) => escapeRegExp(reference.title)).join("|");
  let matcher;
  try {
    matcher = new RegExp(`(?<![\\p{L}\\p{N}_])(${alternatives})(?![\\p{L}\\p{N}_])`, "giu");
  } catch {
    matcher = new RegExp(`(${alternatives})`, "gi");
  }

  let html = "";
  let cursor = 0;
  for (const match of page.body.matchAll(matcher)) {
    html += escapeHtml(page.body.slice(cursor, match.index));
    const reference = referenceByTitle.get(match[0].toLowerCase());
    html += reference
      ? `<button class="wiki-reference" data-action="select-page" data-id="${reference.id}">${escapeHtml(match[0])}</button>`
      : escapeHtml(match[0]);
    cursor = match.index + match[0].length;
  }
  return html + escapeHtml(page.body.slice(cursor));
}

function renderWikiEmpty() {
  return `
    <div class="empty-illustration flex min-h-[560px] flex-col items-center justify-center px-6 text-center">
      <span class="grid h-12 w-12 place-items-center rounded-xl border border-white/[.08] bg-[#15171c] text-stone-500">${icon("book", "h-5 w-5")}</span>
      <h2 class="mt-4 text-sm font-semibold text-stone-300">Build your campaign wiki</h2>
      <p class="mt-1 text-xs text-stone-500">Keep every person, place, and event searchable.</p>
      <button class="button-primary mt-5" data-action="new-page">${icon("plus")} New note</button>
    </div>
  `;
}

function createPage() {
  const page = {
    id: uid(),
    title: "",
    category: "",
    tags: "",
    body: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  state.wiki.pages.unshift(page);
  state.wiki.selectedId = page.id;
  ui.wikiSearch = "";
  ui.wikiCategory = "";
  ui.wikiTag = "";
  ui.wikiMode = "edit";
  saveState();
  renderWiki();
  document.querySelector('[data-wiki-field="title"]')?.focus();
}

function formatRelativeDate(value) {
  if (!value) return "";
  const date = new Date(value);
  const today = new Date();
  if (date.toDateString() === today.toDateString()) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

function renderMusic() {
  const selected = state.music.sources.find((source) => source.id === state.music.selectedId);

  setHeaderActions(`
    <button class="button-primary" data-action="add-source">${icon("plus")}<span>Add source</span></button>
  `);

  document.querySelector("#app").innerHTML = `
    <div class="mx-auto grid max-w-[1500px] gap-4 xl:grid-cols-[minmax(0,1.6fr)_360px] xl:gap-5">
      <section class="panel overflow-hidden">
        <div class="flex items-center justify-between border-b border-white/[.07] px-4 py-3.5 sm:px-5">
          <div class="min-w-0">
            <h2 class="truncate text-sm font-semibold text-parchment">${escapeHtml(selected?.title || "Now playing")}</h2>
            <p class="mt-0.5 truncate text-[11px] text-stone-500">${escapeHtml(selected?.category || "Select a saved source")}</p>
          </div>
          ${selected ? `<a class="icon-button" href="${escapeHtml(safeUrl(selected.url))}" target="_blank" rel="noopener" aria-label="Open source">${icon("external")}</a>` : ""}
        </div>
        <div class="player-frame aspect-video bg-[#090a0c]">
          ${selected ? renderPlayer(selected) : renderPlayerEmpty()}
        </div>
      </section>

      <aside class="panel flex min-h-[420px] flex-col overflow-hidden xl:max-h-[calc(100vh-130px)]">
        <div class="space-y-2 border-b border-white/[.07] p-3">
          <label class="relative block">
            ${icon("search", "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-600")}
            <input id="music-search" class="field h-10 pl-9 pr-3 text-xs" placeholder="Search sources" value="${escapeHtml(ui.musicSearch)}" autocomplete="off">
          </label>
          <select id="music-category-filter" class="field h-9 px-2 text-[11px]" aria-label="Filter music by category">
            <option value="">All categories</option>
            ${getMusicCategories().map((category) => `<option value="${escapeHtml(category)}" ${ui.musicCategory === category ? "selected" : ""}>${escapeHtml(category)}</option>`).join("")}
          </select>
        </div>
        <div id="music-list" class="flex-1 overflow-y-auto p-2">
          ${renderMusicList()}
        </div>
      </aside>
    </div>
  `;
}

function renderMusicList() {
  const query = ui.musicSearch.trim().toLowerCase();
  const sources = state.music.sources
    .filter((source) =>
      !query || [source.title, source.category].some((value) =>
        String(value || "").toLowerCase().includes(query)
      )
    )
    .filter((source) => !ui.musicCategory ||
      String(source.category || "").toLowerCase() === ui.musicCategory.toLowerCase()
    );
  return sources.length
    ? sources.map(renderMusicSource).join("")
    : renderMusicEmpty(Boolean(query || ui.musicCategory));
}

function getMusicCategories() {
  return uniqueSorted(state.music.sources.map((source) => String(source.category || "").trim()));
}

function renderPlayer(source) {
  const embed = getEmbed(source.url);
  if (!embed) {
    return `
      <div class="empty-illustration flex h-full flex-col items-center justify-center px-6 text-center">
        ${icon("external", "h-6 w-6 text-stone-600")}
        <p class="mt-3 text-xs text-stone-400">This source opens in a new tab.</p>
        <a class="button-secondary mt-4" href="${escapeHtml(safeUrl(source.url))}" target="_blank" rel="noopener">Open source ${icon("external")}</a>
      </div>
    `;
  }
  if (embed.type === "audio") {
    return `
      <div class="empty-illustration flex h-full items-center justify-center p-8">
        <audio class="w-full max-w-xl" controls autoplay loop src="${escapeHtml(embed.url)}"></audio>
      </div>
    `;
  }
  return `<iframe src="${escapeHtml(embed.url)}" title="${escapeHtml(source.title)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="eager"></iframe>`;
}

function renderPlayerEmpty() {
  return `
    <div class="empty-illustration flex h-full flex-col items-center justify-center px-6 text-center">
      <span class="grid h-14 w-14 place-items-center rounded-full border border-white/[.08] bg-[#13151a] text-stone-500">${icon("volume", "h-6 w-6")}</span>
      <p class="mt-4 text-xs font-medium text-stone-400">Nothing selected</p>
    </div>
  `;
}

function renderMusicSource(source) {
  const selected = source.id === state.music.selectedId;
  return `
    <div class="group mb-1 flex items-center gap-2 rounded-lg border ${selected ? "border-amber/20 bg-amber/[.07]" : "border-transparent hover:bg-white/[.03]"} p-2">
      <button class="grid h-9 w-9 shrink-0 place-items-center rounded-lg ${selected ? "bg-amber text-[#1b150c]" : "border border-white/[.07] bg-white/[.025] text-stone-500"}" data-action="select-source" data-id="${source.id}" aria-label="Play ${escapeHtml(source.title)}">
        ${icon(selected ? "volume" : "play", "h-4 w-4")}
      </button>
      <button class="min-w-0 flex-1 py-1 text-left" data-action="select-source" data-id="${source.id}">
        <span class="block truncate text-xs font-semibold ${selected ? "text-[#e3bc7f]" : "text-stone-300"}">${escapeHtml(source.title)}</span>
        <span class="mt-1 block truncate text-[10px] font-medium uppercase tracking-[.11em] text-stone-600">${escapeHtml(source.category || "Audio")}</span>
      </button>
      <button class="icon-button opacity-100 sm:opacity-0 sm:group-hover:opacity-100" data-action="delete-source" data-id="${source.id}" aria-label="Delete source">${icon("trash")}</button>
    </div>
  `;
}

function renderMusicEmpty(hasQuery) {
  return `
    <div class="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">
      ${icon(hasQuery ? "search" : "music", "h-5 w-5 text-stone-600")}
      <p class="mt-3 text-xs font-medium text-stone-400">${hasQuery ? "No matches" : "No audio sources"}</p>
      ${hasQuery ? "" : '<button class="mt-3 text-xs font-medium text-amber hover:text-[#e3bc7f]" data-action="add-source">Add one</button>'}
    </div>
  `;
}

function safeUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "#";
  } catch {
    return "#";
  }
}

function getEmbed(value) {
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) return null;
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const videoId = url.pathname.split("/").filter(Boolean)[0];
      return videoId ? { type: "iframe", url: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}` } : null;
    }

    if (host === "youtube.com" || host === "music.youtube.com") {
      const playlistId = url.searchParams.get("list");
      const videoId = url.searchParams.get("v");
      if (url.pathname.startsWith("/embed/")) return { type: "iframe", url: url.href };
      if (videoId) return { type: "iframe", url: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}${playlistId ? `?list=${encodeURIComponent(playlistId)}` : ""}` };
      if (playlistId) return { type: "iframe", url: `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(playlistId)}` };
    }

    if (host === "open.spotify.com") {
      const path = url.pathname.replace(/^\/embed/, "");
      return { type: "iframe", url: `https://open.spotify.com/embed${path}` };
    }

    if (/\.(mp3|wav|ogg|m4a)(\?.*)?$/i.test(url.href)) {
      return { type: "audio", url: url.href };
    }
    return null;
  } catch {
    return null;
  }
}

function openEncounterModal() {
  openModal(`
    <form class="modal-card w-full max-w-sm rounded-2xl border border-white/10 bg-[#17191e] p-5 shadow-2xl sm:p-6" data-form="new-encounter">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 class="text-base font-semibold text-parchment">New combat</h2>
          <p class="mt-1 text-xs text-stone-500">The current combat stays in history.</p>
        </div>
        <button class="icon-button" type="button" data-action="close-modal" aria-label="Close">${icon("x")}</button>
      </div>
      <label class="mt-6 block">
        <span class="mb-1.5 block text-[11px] font-medium text-stone-400">Combat name</span>
        <input class="field h-10 px-3 text-sm" name="name" placeholder="Ruins encounter" required autofocus>
      </label>
      <div class="mt-6 flex justify-end gap-2">
        <button class="button-secondary" type="button" data-action="close-modal">Cancel</button>
        <button class="button-primary" type="submit">${icon("plus")} Create</button>
      </div>
    </form>
  `);
}

function openLibraryModal(editId = null) {
  const selected = state.combat.library.find((character) => character.id === editId);
  openModal(`
    <div class="modal-card flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#17191e] shadow-2xl">
      <div class="flex items-start justify-between border-b border-white/[.07] p-5 sm:px-6">
        <div>
          <h2 class="text-base font-semibold text-parchment">Character presets</h2>
          <p class="mt-1 text-xs text-stone-500">Save reusable characters for quick initiative entry.</p>
        </div>
        <button class="icon-button" data-action="close-modal" aria-label="Close">${icon("x")}</button>
      </div>
      <div class="grid min-h-0 flex-1 overflow-y-auto md:grid-cols-[1fr_1.1fr]">
        <div class="border-b border-white/[.07] p-4 md:border-b-0 md:border-r">
          <p class="mb-3 text-[10px] font-semibold uppercase tracking-[.13em] text-stone-500">Saved characters</p>
          <div class="space-y-1.5">
            ${state.combat.library.length ? state.combat.library.map((character) => `
              <div class="flex items-center gap-2 rounded-lg border ${character.id === editId ? "border-amber/25 bg-amber/[.06]" : "border-white/[.06] bg-white/[.02]"} p-2.5">
                <div class="min-w-0 flex-1">
                  <p class="truncate text-xs font-semibold text-stone-300">${escapeHtml(character.name)}</p>
                  <p class="mt-1 text-[10px] uppercase tracking-[.1em] text-stone-600">${escapeHtml(character.type)} · HP ${Number(character.maxHp || 0)} · AC ${Number(character.ac || 0)}</p>
                </div>
                <button class="icon-button" data-action="edit-library-character" data-id="${character.id}" aria-label="Edit ${escapeHtml(character.name)}">${icon("edit")}</button>
                <button class="icon-button" data-action="delete-library-character" data-id="${character.id}" aria-label="Delete ${escapeHtml(character.name)}">${icon("trash")}</button>
              </div>
            `).join("") : `
              <div class="rounded-lg border border-dashed border-white/[.08] px-4 py-8 text-center text-xs text-stone-600">No saved characters</div>
            `}
          </div>
        </div>
        <form class="p-4 sm:p-5" data-form="save-library-character" data-id="${selected?.id || ""}">
          <p class="mb-4 text-[10px] font-semibold uppercase tracking-[.13em] text-stone-500">${selected ? "Edit preset" : "New preset"}</p>
          <div class="space-y-3">
            <label class="block">
              <span class="mb-1.5 block text-[11px] font-medium text-stone-400">Name</span>
              <input class="field h-10 px-3 text-sm" name="name" value="${escapeHtml(selected?.name || "")}" required autofocus>
            </label>
            <div class="grid grid-cols-3 gap-2">
              <label>
                <span class="mb-1.5 block text-[11px] font-medium text-stone-400">Type</span>
                <select class="field h-10 px-2 text-xs" name="type">
                  ${["Player", "Ally", "Enemy", "Other"].map((type) => `<option value="${type}" ${selected?.type === type || (!selected && type === "Player") ? "selected" : ""}>${type}</option>`).join("")}
                </select>
              </label>
              <label>
                <span class="mb-1.5 block text-[11px] font-medium text-stone-400">HP</span>
                <input class="field h-10 px-2 text-sm" name="maxHp" type="number" min="0" value="${Number(selected?.maxHp || 0)}">
              </label>
              <label>
                <span class="mb-1.5 block text-[11px] font-medium text-stone-400">AC</span>
                <input class="field h-10 px-2 text-sm" name="ac" type="number" min="0" value="${Number(selected?.ac || 0)}">
              </label>
            </div>
          </div>
          <div class="mt-5 flex justify-end gap-2">
            ${selected ? '<button class="button-secondary" type="button" data-action="manage-library">New preset</button>' : ""}
            <button class="button-primary" type="submit">${icon(selected ? "edit" : "plus")} ${selected ? "Save changes" : "Save preset"}</button>
          </div>
        </form>
      </div>
    </div>
  `);
}

function openSourceModal() {
  openModal(`
    <form class="modal-card w-full max-w-md rounded-2xl border border-white/10 bg-[#17191e] p-5 shadow-2xl sm:p-6" data-form="add-source">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 class="text-base font-semibold text-parchment">Add audio source</h2>
          <p class="mt-1 text-xs text-stone-500">YouTube, Spotify, or direct audio URL.</p>
        </div>
        <button class="icon-button" type="button" data-action="close-modal" aria-label="Close">${icon("x")}</button>
      </div>
      <div class="mt-6 space-y-4">
        <label class="block">
          <span class="mb-1.5 block text-[11px] font-medium text-stone-400">Name</span>
          <input class="field h-10 px-3 text-sm" name="title" placeholder="Forest ambience" required autofocus>
        </label>
        <label class="block">
          <span class="mb-1.5 block text-[11px] font-medium text-stone-400">Category</span>
          <input class="field h-10 px-3 text-sm" name="category" placeholder="Ambience">
        </label>
        <label class="block">
          <span class="mb-1.5 block text-[11px] font-medium text-stone-400">URL</span>
          <input class="field h-10 px-3 text-sm" name="url" type="url" placeholder="https://…" required>
        </label>
      </div>
      <div class="mt-6 flex justify-end gap-2">
        <button class="button-secondary" type="button" data-action="close-modal">Cancel</button>
        <button class="button-primary" type="submit">${icon("plus")} Add source</button>
      </div>
    </form>
  `);
}

function openModal(content) {
  document.querySelector("#modal-root").innerHTML = `
    <div class="modal-backdrop fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" data-action="backdrop-close">
      ${content}
    </div>
  `;
  window.setTimeout(() => document.querySelector("#modal-root [autofocus]")?.focus(), 20);
}

function closeModal() {
  document.querySelector("#modal-root").innerHTML = "";
  ui.confirmCallback = null;
}

function confirmAction({ title, message, confirmLabel = "Confirm", danger = true }, callback) {
  ui.confirmCallback = callback;
  openModal(`
    <div class="modal-card w-full max-w-sm rounded-2xl border border-white/10 bg-[#17191e] p-5 shadow-2xl sm:p-6" role="dialog" aria-modal="true">
      <h2 class="text-base font-semibold text-parchment">${escapeHtml(title)}</h2>
      <p class="mt-2 text-xs leading-5 text-stone-500">${escapeHtml(message)}</p>
      <div class="mt-6 flex justify-end gap-2">
        <button class="button-secondary" data-action="close-modal">Cancel</button>
        <button class="${danger ? "button-danger" : "button-primary"}" data-action="confirm-modal">${escapeHtml(confirmLabel)}</button>
      </div>
    </div>
  `);
}

function exportData() {
  const payload = JSON.stringify({ ...state, exportedAt: new Date().toISOString() }, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `dm-tool-backup-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
  showToast("Backup exported");
}

async function importData(file) {
  try {
    const parsed = JSON.parse(await file.text());
    if (!parsed.combat || !parsed.wiki || !parsed.music) throw new Error("Invalid backup");
    state = loadState(parsed);
    saveState();
    render();
    showToast("Backup imported");
  } catch {
    showToast("Could not import that file");
  }
}

function findCombatant(id) {
  return getActiveEncounter().combatants.find((combatant) => combatant.id === id);
}

function handleSubmit(event) {
  const form = event.target.closest("[data-form]");
  if (!form) return;
  event.preventDefault();

  if (form.dataset.form === "add-combatant") {
    addCombatant(form);
  }

  if (form.dataset.form === "add-saved-character") {
    const preset = state.combat.library.find((character) => character.id === form.dataset.id);
    if (!preset) return;
    const encounter = getActiveEncounter();
    const initiative = Number(new FormData(form).get("initiative")) || 0;
    encounter.combatants.push(normalizeCombatant({
      ...preset,
      id: uid(),
      initiative,
      hp: Number(preset.maxHp || 0),
      conditions: [],
      roundNotes: {}
    }));
    encounter.combatants.sort((a, b) => b.initiative - a.initiative);
    encounter.started = false;
    encounter.activeId = null;
    touchEncounter(encounter);
    saveState();
    renderCombat();
    showToast(`${preset.name} added`);
  }

  if (form.dataset.form === "new-encounter") {
    const name = String(new FormData(form).get("name") || "").trim();
    const encounter = createEncounter(name || "New combat");
    state.combat.encounters.unshift(encounter);
    state.combat.activeEncounterId = encounter.id;
    saveState();
    closeModal();
    renderCombat();
    showToast("Combat created");
  }

  if (form.dataset.form === "save-library-character") {
    const data = new FormData(form);
    const character = {
      id: form.dataset.id || uid(),
      name: String(data.get("name") || "").trim(),
      type: String(data.get("type") || "Player"),
      maxHp: Math.max(0, Number(data.get("maxHp")) || 0),
      ac: Math.max(0, Number(data.get("ac")) || 0)
    };
    const existingIndex = state.combat.library.findIndex((item) => item.id === character.id);
    if (existingIndex >= 0) state.combat.library[existingIndex] = character;
    else state.combat.library.push(character);
    state.combat.library.sort((a, b) => a.name.localeCompare(b.name));
    saveState();
    renderCombat();
    openLibraryModal(character.id);
    showToast(existingIndex >= 0 ? "Preset updated" : "Preset saved");
  }

  if (form.dataset.form === "add-condition") {
    const combatant = findCombatant(form.dataset.id);
    const condition = String(new FormData(form).get("condition") || "").trim();
    if (!combatant || !condition) return;
    combatant.conditions = [...(combatant.conditions || []), condition];
    touchEncounter();
    saveState();
    renderCombat();
  }

  if (form.dataset.form === "add-source") {
    const data = new FormData(form);
    const url = safeUrl(String(data.get("url") || ""));
    if (url === "#") {
      showToast("Enter a valid web address");
      return;
    }
    const source = {
      id: uid(),
      title: String(data.get("title") || "").trim(),
      category: String(data.get("category") || "").trim(),
      url
    };
    state.music.sources.unshift(source);
    state.music.selectedId = source.id;
    saveState();
    closeModal();
    renderMusic();
  }
}

function handleInput(event) {
  if (event.target.id === "wiki-search") {
    ui.wikiSearch = event.target.value;
    document.querySelector("#wiki-list").innerHTML = renderWikiList();
  }

  if (event.target.id === "music-search") {
    ui.musicSearch = event.target.value;
    document.querySelector("#music-list").innerHTML = renderMusicList();
  }

  if (event.target.matches("[data-round-note]")) {
    const combatant = findCombatant(event.target.dataset.id);
    if (!combatant) return;
    combatant.roundNotes ||= {};
    combatant.roundNotes[event.target.dataset.round] = event.target.value;
    touchEncounter();
    saveSoon();
  }

  const field = event.target.dataset.wikiField;
  if (field) {
    const page = state.wiki.pages.find((item) => item.id === event.target.dataset.id);
    if (!page) return;
    page[field] = event.target.value;
    page.updatedAt = new Date().toISOString();
    saveSoon();
  }
}

function handleChange(event) {
  if (event.target.id === "encounter-selector") {
    state.combat.activeEncounterId = event.target.value;
    saveState();
    renderCombat();
    return;
  }

  if (event.target.id === "wiki-category-filter") {
    ui.wikiCategory = event.target.value;
    document.querySelector("#wiki-list").innerHTML = renderWikiList();
    return;
  }

  if (event.target.id === "wiki-tag-filter") {
    ui.wikiTag = event.target.value;
    document.querySelector("#wiki-list").innerHTML = renderWikiList();
    return;
  }

  if (event.target.id === "music-category-filter") {
    ui.musicCategory = event.target.value;
    document.querySelector("#music-list").innerHTML = renderMusicList();
    return;
  }

  const encounterField = event.target.dataset.encounterField;
  if (encounterField) {
    const encounter = getActiveEncounter();
    encounter[encounterField] = event.target.value.trim() || "Untitled combat";
    touchEncounter(encounter);
    saveState();
    renderCombat();
    return;
  }

  const field = event.target.dataset.combatField;
  if (!field) return;
  const encounter = getActiveEncounter();
  const combatant = findCombatant(event.target.dataset.id);
  if (!combatant) return;
  combatant[field] = ["initiative", "hp", "maxHp", "ac"].includes(field)
    ? Number(event.target.value) || 0
    : event.target.value;
  if (field === "initiative") {
    encounter.started = false;
    encounter.activeId = null;
  }
  touchEncounter(encounter);
  saveState();
  renderCombat();
}

function handleClick(event) {
  const target = event.target.closest("[data-action]");
  if (!target) {
    if (!event.target.closest("#app-menu")) document.querySelector("#app-menu").classList.add("hidden");
    return;
  }

  const action = target.dataset.action;
  const id = target.dataset.id;

  if (action === "toggle-menu") {
    event.stopPropagation();
    document.querySelector("#app-menu").classList.toggle("hidden");
  }
  if (action === "export-data") {
    document.querySelector("#app-menu").classList.add("hidden");
    exportData();
  }
  if (action === "import-data") {
    document.querySelector("#app-menu").classList.add("hidden");
    document.querySelector("#import-file").click();
  }
  if (action === "reset-data") {
    document.querySelector("#app-menu").classList.add("hidden");
    confirmAction({
      title: "Reset all data?",
      message: "This removes all combats, character presets, wiki notes, and audio sources stored on this device.",
      confirmLabel: "Reset everything"
    }, () => {
      state = createDefaultState();
      saveState();
      closeModal();
      render();
      showToast("All data reset");
    });
  }
  if (action === "start-combat") stepTurn(1);
  if (action === "next-turn") stepTurn(1);
  if (action === "previous-turn") stepTurn(-1);
  if (action === "set-active") {
    const encounter = getActiveEncounter();
    encounter.started = true;
    encounter.activeId = id;
    touchEncounter(encounter);
    saveState();
    renderCombat();
  }
  if (action === "adjust-hp") {
    const combatant = findCombatant(id);
    if (!combatant) return;
    combatant.hp = Math.max(0, Number(combatant.hp || 0) + Number(target.dataset.delta));
    touchEncounter();
    saveState();
    renderCombat();
  }
  if (action === "remove-condition") {
    const combatant = findCombatant(id);
    if (!combatant) return;
    combatant.conditions.splice(Number(target.dataset.index), 1);
    touchEncounter();
    saveState();
    renderCombat();
  }
  if (action === "remove-combatant") {
    const encounter = getActiveEncounter();
    encounter.combatants = encounter.combatants.filter((combatant) => combatant.id !== id);
    if (encounter.activeId === id) encounter.activeId = null;
    if (!encounter.combatants.length) encounter.started = false;
    touchEncounter(encounter);
    saveState();
    renderCombat();
  }
  if (action === "new-encounter") {
    openEncounterModal();
  }
  if (action === "delete-encounter" && state.combat.encounters.length > 1) {
    const encounter = getActiveEncounter();
    confirmAction({
      title: "Delete this combat?",
      message: `${encounter.name} and all its round notes will be removed.`,
      confirmLabel: "Delete combat"
    }, () => {
      state.combat.encounters = state.combat.encounters.filter((item) => item.id !== encounter.id);
      state.combat.activeEncounterId = state.combat.encounters[0].id;
      saveState();
      closeModal();
      renderCombat();
      showToast("Combat deleted");
    });
  }
  if (action === "manage-library") openLibraryModal();
  if (action === "edit-library-character") openLibraryModal(id);
  if (action === "delete-library-character") {
    const character = state.combat.library.find((item) => item.id === id);
    confirmAction({
      title: "Delete this preset?",
      message: character?.name || "Saved character",
      confirmLabel: "Delete preset"
    }, () => {
      state.combat.library = state.combat.library.filter((item) => item.id !== id);
      saveState();
      renderCombat();
      openLibraryModal();
      showToast("Preset deleted");
    });
  }
  if (action === "new-page") createPage();
  if (action === "select-page") {
    state.wiki.selectedId = id;
    saveState();
    renderWiki();
  }
  if (action === "delete-page") {
    const page = state.wiki.pages.find((item) => item.id === id);
    confirmAction({
      title: "Delete this note?",
      message: page?.title || "Untitled note",
      confirmLabel: "Delete note"
    }, () => {
      state.wiki.pages = state.wiki.pages.filter((item) => item.id !== id);
      state.wiki.selectedId = state.wiki.pages[0]?.id || null;
      saveState();
      closeModal();
      renderWiki();
      showToast("Note deleted");
    });
  }
  if (action === "wiki-mode") {
    ui.wikiMode = target.dataset.mode;
    renderWiki();
  }
  if (action === "add-source") openSourceModal();
  if (action === "select-source") {
    state.music.selectedId = id;
    saveState();
    renderMusic();
  }
  if (action === "delete-source") {
    const source = state.music.sources.find((item) => item.id === id);
    confirmAction({
      title: "Delete this source?",
      message: source?.title || "Audio source",
      confirmLabel: "Delete source"
    }, () => {
      state.music.sources = state.music.sources.filter((item) => item.id !== id);
      if (state.music.selectedId === id) state.music.selectedId = state.music.sources[0]?.id || null;
      saveState();
      closeModal();
      renderMusic();
      showToast("Source deleted");
    });
  }
  if (action === "close-modal") closeModal();
  if (action === "backdrop-close" && event.target === target) closeModal();
  if (action === "confirm-modal" && ui.confirmCallback) {
    const callback = ui.confirmCallback;
    ui.confirmCallback = null;
    callback();
  }
}

hydrateShell();
render();

window.addEventListener("hashchange", render);
document.addEventListener("submit", handleSubmit);
document.addEventListener("input", handleInput);
document.addEventListener("change", handleChange);
document.addEventListener("click", handleClick);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    document.querySelector("#app-menu").classList.add("hidden");
  }
});
document.querySelector("#import-file").addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (file) importData(file);
  event.target.value = "";
});
