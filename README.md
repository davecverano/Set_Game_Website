# Game of Set

A browser version of the card game *Set* for 1–4 players on the same computer. Plain HTML, CSS and JavaScript, no build step. I built it to practice JavaScript and the fundamentals of web development.

![Set game demo](https://user-images.githubusercontent.com/49330823/180523801-9517500d-75e3-4380-84ce-a0381ef10939.JPG)

## How to play

A **set** is 3 cards where, for each of the four attributes (color, shape, shading, number), the cards are either all the same or all different.

1. When you spot a set, click your player button (Player 1–4), then click the three cards.
2. A correct set scores +1 and the cards are replaced; a wrong set scores −1.
3. When the deck runs out and no sets are left, the highest score wins.

| Button | What it does |
|---|---|
| **New Game** | Reshuffles all 81 cards, deals 12 and resets every score |
| **Hint** | Names one card that is part of a set |
| **Auto Check** | When on, deals 3 more cards automatically whenever the table has no set |
| **Add 3 Cards** | Deals 3 more cards by hand (up to 30 on the table) |

## Run it

Clone the repo and open `index.html` in a browser:

```bash
git clone https://github.com/davecverano/Set_Game_Website.git
cd Set_Game_Website
python -m http.server 8000   # or just double-click index.html
```

Then go to http://localhost:8000.

## Project layout

```
index.html   page layout and controls
set.js       game engine: deck, shuffling, set detection, scoring
site.css     styles
images/      the 81 card images
```
