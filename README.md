# Koala Family Delivery

A pixel-style browser game. The koala delivers families to the house that has the **exact same number of beds** as family members.

## How to play

- **Move:** Arrow keys or WASD  
- **Pick up / Drop off:** Space (walk to a family to pick up, then to a house to drop off)
- **Goal:** Deliver each family to a house whose bed count matches the family size (1–4). Correct delivery = +100 points. Wrong house = lose a life. You have 3 lives.
- **Leaderboard:** After game over, enter your name and submit to save your score. Use "View Leaderboard" on the start screen to see the top 10.

## Run the game

Open `index.html` in a modern browser (Chrome, Firefox, Safari, Edge).  
For best results (e.g. if the leaderboard doesn’t save), serve the folder with a local server, for example:

```bash
# Python 3
python3 -m http.server 8000

# Node (npx)
npx serve .
```

Then go to `http://localhost:8000` (or the port shown).

## Assets

Uses pixel art from the `assets/` folder: koala (still/walk), houses (empty/full), people, bush, sun.
