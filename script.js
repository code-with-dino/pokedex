// -------------------------------------------------------
// Type color map — badge background + text color per type
// -------------------------------------------------------
const TYPE_COLORS = {
  normal: { bg: "#A8A878", text: "#fff" },
  fire: { bg: "#F08030", text: "#fff" },
  water: { bg: "#6890F0", text: "#fff" },
  electric: { bg: "#F8D030", text: "#705800" },
  grass: { bg: "#78C850", text: "#fff" },
  ice: { bg: "#98D8D8", text: "#006060" },
  fighting: { bg: "#C03028", text: "#fff" },
  poison: { bg: "#A040A0", text: "#fff" },
  ground: { bg: "#E0C068", text: "#604000" },
  flying: { bg: "#A890F0", text: "#fff" },
  psychic: { bg: "#F85888", text: "#fff" },
  bug: { bg: "#A8B820", text: "#fff" },
  rock: { bg: "#B8A038", text: "#fff" },
  ghost: { bg: "#705898", text: "#fff" },
  dragon: { bg: "#7038F8", text: "#fff" },
  dark: { bg: "#705848", text: "#fff" },
  steel: { bg: "#B8B8D0", text: "#444" },
  fairy: { bg: "#EE99AC", text: "#7a003a" },
};

// -------------------------------------------------------
// Frame color — the outer Pokédex shell changes per type
// -------------------------------------------------------
const FRAME_COLORS = {
  fire: "#c0392b",
  water: "#1a6fa8",
  grass: "#27743a",
  electric: "#c0891a",
  psychic: "#9b2c6e",
  ice: "#2a7a8a",
  dragon: "#4a1fa8",
  dark: "#3a2e26",
  fairy: "#c4426e",
  poison: "#6a1a8a",
  ghost: "#4a3060",
  fighting: "#8a2020",
  normal: "#888060",
  bug: "#6a7a10",
  rock: "#8a7828",
  ground: "#aa8840",
  flying: "#6858c0",
  steel: "#8888a8",
};

// -------------------------------------------------------
// Sprite box background — tinted to match the type
// -------------------------------------------------------
const SPRITE_BG = {
  fire: "#f5c6a0",
  water: "#a0c8f5",
  grass: "#a8d880",
  electric: "#f8e880",
  psychic: "#f8a8c8",
  ice: "#b8eef8",
  dragon: "#b8a0f8",
  dark: "#887878",
  fairy: "#f8c8d8",
  poison: "#d8a8f8",
  ghost: "#c0b0e0",
  fighting: "#f8b8a8",
  normal: "#d8d8c0",
  bug: "#c8d870",
  rock: "#d8c870",
  ground: "#e8d0a0",
  flying: "#c8c0f0",
  steel: "#d0d0e0",
};

// Keep track of which Pokémon we're on for prev/next
let currentId = 25;

// -------------------------------------------------------
// Fetch a Pokémon by name or ID from PokéAPI
// -------------------------------------------------------
async function fetchPokemon(query) {
  const errorOutput = document.getElementById("error-output");
  errorOutput.textContent = "";
  if (!query && query !== 0) return;

  try {
    const cleanQuery = String(query).toLowerCase().trim();
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${cleanQuery}`,
    );

    if (!response.ok) throw new Error("NOT FOUND!");

    const data = await response.json();
    currentId = data.id;
    updatePokedex(data);

    // Fetch the flavor text separately from the species endpoint
    fetchFlavor(data.id);
  } catch (err) {
    errorOutput.textContent = `Error: ${err.message}`;
  }
}

// -------------------------------------------------------
// Fetch flavor text from the species endpoint
// This is a second API call chained after the main fetch
// -------------------------------------------------------
async function fetchFlavor(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const data = await res.json();

    // The API returns many flavor text entries in different languages
    // We filter to find the first English one
    const entry = data.flavor_text_entries.find(
      (e) => e.language.name === "en",
    );

    if (entry) {
      // The text sometimes has \f (form feed) characters — replace with space
      document.getElementById("flavor-text").textContent =
        entry.flavor_text.replace(/\f/g, " ");
    }
  } catch (e) {
    // Silently fail — flavor text is a nice-to-have, not critical
  }
}

// -------------------------------------------------------
// Update all UI elements with the fetched Pokémon data
// -------------------------------------------------------
function updatePokedex(data) {
  // Basic info
  document.getElementById("poke-id").textContent =
    `#${String(data.id).padStart(3, "0")}`;
  document.getElementById("poke-name").textContent = data.name.toUpperCase();
  document.getElementById("nav-id").textContent =
    `#${String(data.id).padStart(3, "0")} / 1025`;

  // Sprite
  document.getElementById("poke-sprite").src = data.sprites.front_default || "";

  // Types — extract the primary type for theming
  const types = data.types.map((t) => t.type.name);
  const primaryType = types[0];

  // Rebuild the type badge container
  const tc = document.getElementById("type-container");
  tc.innerHTML = '<span style="color:#99aab5;font-size:8px;">TYPE: </span>';
  types.forEach((t) => {
    const colors = TYPE_COLORS[t] || { bg: "#888", text: "#fff" };
    const badge = document.createElement("span");
    badge.className = "type-badge";
    badge.textContent = t.toUpperCase();
    badge.style.background = colors.bg;
    badge.style.color = colors.text;
    tc.appendChild(badge);
  });

  // Apply type-based theming to the frame, sprite box, and name color
  document.getElementById("pokedex").style.backgroundColor =
    FRAME_COLORS[primaryType] || "#dc3545";
  document.getElementById("sprite-box").style.backgroundColor =
    SPRITE_BG[primaryType] || "#98cb98";
  document.getElementById("poke-name").style.color =
    TYPE_COLORS[primaryType]?.bg || "#5865f2";

  // Stats — each bar is scaled against 255 (the max possible stat value)
  data.stats.forEach((s) => {
    const pct = Math.round((s.base_stat / 255) * 100);
    if (s.stat.name === "hp") {
      document.getElementById("stat-hp").textContent = s.base_stat;
      document.getElementById("bar-hp").style.width = pct + "%";
    }
    if (s.stat.name === "attack") {
      document.getElementById("stat-atk").textContent = s.base_stat;
      document.getElementById("bar-atk").style.width = pct + "%";
    }
    if (s.stat.name === "defense") {
      document.getElementById("stat-def").textContent = s.base_stat;
      document.getElementById("bar-def").style.width = pct + "%";
    }
    if (s.stat.name === "speed") {
      document.getElementById("stat-spd").textContent = s.base_stat;
      document.getElementById("bar-spd").style.width = pct + "%";
    }
  });

  // Reset flavor text while the second fetch loads
  document.getElementById("flavor-text").textContent = "Loading...";
}

// -------------------------------------------------------
// Event listeners
// -------------------------------------------------------
document
  .getElementById("search-btn")
  .addEventListener("click", () =>
    fetchPokemon(document.getElementById("search-input").value),
  );

document.getElementById("search-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter")
    fetchPokemon(document.getElementById("search-input").value);
});

document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentId > 1) fetchPokemon(currentId - 1);
});

document.getElementById("next-btn").addEventListener("click", () => {
  if (currentId < 1025) fetchPokemon(currentId + 1);
});
