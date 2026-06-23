# Retro Pokédex

A retro-styled Pokédex web app that fetches live data from the [PokéAPI](https://pokeapi.co/). Search any Pokémon by name or ID, browse with PREV/NEXT, and watch the whole UI shift colors to match the Pokémon's type.

![Finished Pokedex](screenshots/finished.png)

---

## Features

- Search by name or Pokédex number
- ◀ ▶ Browse all 1025 Pokémon one by one
- Dynamic type-based color theming (frame, sprite box, name)
- Animated stat bars
- Flavor text pulled from the species endpoint
- Responsive layout — stacks on mobile, side-by-side on desktop
- Crisp pixel-art sprites with `image-rendering: pixelated`

---

## Live Demo

**[Try it here](https://github.com/code-with-dino/pokedex)**

---

## Built With

- HTML5
- CSS3 (Grid, Flexbox, transitions)
- Vanilla JavaScript (Fetch API, async/await)
- [PokéAPI](https://pokeapi.co/) — free, open Pokémon data
- [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) — Google Fonts

---

## Project Structure

```
pokedex/
├── index.html   # App structure and markup
├── style.css    # Retro pixel-art styling
└── script.js    # API calls and DOM updates
```

---

## Run Locally

No build tools or installs needed — it's plain HTML/CSS/JS.

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/pokedex.git
   cd pokedex
   ```

2. Open `index.html` in your browser:

   ```bash
   open index.html        # macOS
   start index.html       # Windows
   xdg-open index.html    # Linux
   ```

   Or just drag `index.html` into any browser window.

---

## API Reference

This project makes two API calls per Pokémon:

| Endpoint                                         | Used for             |
| ------------------------------------------------ | -------------------- |
| `https://pokeapi.co/api/v2/pokemon/{name or id}` | Sprite, stats, types |
| `https://pokeapi.co/api/v2/pokemon-species/{id}` | Flavor text          |

No API key required.

---

## Possible Extensions

- Toggle between normal and **shiny sprites** (`data.sprites.front_shiny`)
- Add **Special Attack / Special Defense** stat rows
- **Random Pokémon** button (random number 1–1025)
- Show **height and weight** (`data.height`, `data.weight`)

---

## Tutorial

This project was built as part of the [Codédex June 2026 Project Tutorial Challenge](https://www.codedex.io/community/monthly-challenge/june-2026).

Read the full step-by-step tutorial → _(link to your Codédex post)_

---

## License

MIT — free to use and modify.
