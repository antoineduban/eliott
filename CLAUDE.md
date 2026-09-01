# Notes for agents working on this repo

MakeCode Arcade project (static TypeScript) for a kid's handheld: an **ELECFREAKS Arcade** console
(STM32F412 board, MakeCode hardware variant `stm32f401`). On USB it appears as "Arcade (app)"
(VID `0x0483` / PID `0x5799`) while a MakeCode game runs, and as ELECFREAKS "Arcade"
(VID `0x26AC` / PID `0x1043`) in bootloader mode.
The repo holds **three separate MakeCode projects** (one binary each; the console holds one game at a time):
- the root: **"Lila la fée"**, a French platformer for a 6-year-old: 6 levels, 6 bosses, potions with random
  effects, mushrooms that transform Lila, and one logic puzzle per level (the owl's gate, `puzzles.ts`)
  (see `README.md` for the player-facing description and file map);
- `course/`: **"Vroum !"**, a top-down car race (5 races, faster each time, obstacles to dodge left/right,
  A = turbo). Same toolchain from inside the folder: `cd course && ../node_modules/.bin/makecode build -j`,
  `makecode serve -p 7002`, native `makecode build` → `course/built/stm32f401/binary.uf2`, flash with
  `node tools/deploy.mjs course/built/stm32f401/binary.uf2`. Its `font.ts` is a symlink to the root one.
  Test with `SIM_SPEED=4 node tools/play-race.mjs 400 4` (demo bot: DOWN + A on the title; log lines
  `RACE n START`, `CRASH life=n`, `RESTART`, `FINISH n score=s`, `CHAMPION`). Difficulty lives in
  `course/tracks.ts` (speed, `gap` between obstacle waves — keep `gap / speed` ≥ 1.2 s, double-wave chance);
- `odyssee/`: **"L'Odyssée d'Ulysse"**, a reskin of the Lila engine (same files, states, log lines and
  title-screen shortcuts): Ulysses shoots arrows (B), collects gold coins, amphoras = potions, lotus
  flowers = transformations (eagle flies / satyr jumps / centaur runs), the puzzle gate is Athena's owl.
  6 islands / 6 bosses: Polyphème (crab-style charge + lobs), Reine des Harpies (witch-style), Circé
  (shadow-king-style teleport), Reine des Sirènes (aimed notes + dives), Atlas (yeti-style quake),
  Poséidon (floats, lobs lightning ×2, summons sea-serpent walkers). Theme 5 (storm deck) is the
  slippery one. Serve with `makecode serve -p 7003` from inside `odyssee/`; test with
  `SIM_SPEED=4 node tools/play-odyssee.mjs 400 5` (same demo bot & log lines as Lila, `STAR` = coins);
  `node tools/checklevels.mjs odyssee/levels.ts` checks its levels (layout geometry reuses Lila's six
  verified levels, so both games share the same difficulty curve). Its `font.ts` is a symlink too —
  **no capital `Î`/`Œ` anywhere**, only the lowercase accents patched by `font.ts` (use "L'île", "oeil").
The two older games are kept in `archive/` and are **not** compiled (not listed in any `pxt.json`).

Everything below was learned the hard way on 2026-08-29. Trust it over guesses.

## Toolchain

- The compiler is the `makecode` CLI (mkc) installed as a dev dependency: `./node_modules/.bin/makecode`.
  The VS Code MakeCode extension uses the same engine; the CLI is enough and scriptable.
- `pxt.json` `files` lists the compiled files **in order**; top-level code runs in that order, so
  `main.ts` (which calls `Game.start()`) must stay last and other files must only declare namespaces.
- Formatting/lint: `yarn lint` (Biome, 4 spaces, no semicolons, `===` mandatory). Biome reformats files
  after every edit-and-lint cycle; re-read a file before editing it again.
- VS Code shows false errors in `.ts` files (`screen.fillRect` unknown, `Math.idiv` unknown, `null`
  not assignable): its TypeScript service uses DOM typings, not MakeCode's. Only the mkc build result
  counts. Use `image.screenImage()`/`screen` freely.
- `mkc.json` carries `"hwVariant": "stm32f401"`. Do **not** pass `--hw` to `makecode build`: the CLI
  crashes in `selectHW` (`cfg.card` undefined). With the variant in `mkc.json`, `makecode build`
  produces `built/stm32f401/binary.uf2`; `makecode build -j` produces `built/binary.js` for the simulator.

## Flash budget (the simulator build does not check it)

`makecode build` (native) fails with `program too big by N bytes` when the STM32F401 flash is exceeded;
`makecode build -j` never complains, so **always run the native build before finishing**. Found on
2026-08-29 when the puzzles pushed the game 7.8 KB over. Big-ticket items, from the asm listing
(`built/stm32f401/binary.asm`, one `; Function file(line,col): name` header per function — sum the
instruction/`.hex`/`.word` lines per file to see who weighs what):
- `sprite.sayText` links `sprites.RenderText` + `spritesay.ts` (tens of KB): draw speech bubbles by
  hand in `onShade` instead (`Bosses.say`, uses `game.currentScene().camera.drawOffsetX/Y`).
- `animation.runImageAnimation` links the whole `animation` package (~14 KB): swap frames manually.
- Files listed in `pxt.json` are compiled even if unused: the old games' `images.g.ts`/`.jres` cost 2 KB
  and now live in `archive/`.
- Story text and level ASCII are stored verbatim (~7 KB + ~4 KB); `effects.*`, `music.*` melodies and the
  system menu are always linked, nothing to gain there.
After these changes the UF2 is 819 KB (it was 846 KB before the puzzles, and that still fit).

## Build & run in the simulator

```sh
./node_modules/.bin/makecode build -j            # simulator JS
./node_modules/.bin/makecode serve -p 7001       # local simulator page, rebuilds on file change,
                                                 # the page auto-reloads when built/binary.js changes
```

Keep `makecode serve` running in the background while iterating (`(makecode serve > /tmp/mkc-serve.log 2>&1 &)`).

## Automated testing (Playwright drives the simulator)

`tools/sim.mjs` opens `http://localhost:7001/` in headless Chromium (`playwright-core`, browsers already
cached in `~/Library/Caches/ms-playwright`) and exposes: `wait`, `shot <name>` (PNG of the game canvas
in `tools/shots/`, gitignored), `press/hold/down/up <key>`, `log` (game `console.log` output, captured
from the sim's `serial` postMessages), `reload`.

- Simulator keys: arrows, **z = A button**, **x = B button**, Enter = menu.
- `SIM_SPEED=4` injects a time warp (scaled `Date.now`/`performance.now`/timers) so the game runs ~4x
  faster; command durations are in game time. Playwright's fake clock was tried and is slower (x1.8).
- `tools/play.mjs [maxGameSeconds] [shotEverySeconds] [startLevel]` starts the in-game **demo bot**
  (title screen: hold DOWN + press A → `Autoplay.start()`; B first to pick the start level), streams the
  game's log lines (`LEVEL n START`, `STAR k`, `POTION …`, `MUSHROOM …`, `PORTAL`, `BOSS ... hp=n`,
  `BOSS n DEFEATED`, `DEFEAT`, `VICTOIRE`) and stops on `VICTOIRE`. A full run takes ~300–350 s of game
  time ≈ 90 s real at x4; `play.mjs 150 5 6` tests one level. Use it after any gameplay change; if the
  bot gets stuck or dies in a loop, look at the periodic screenshots (1 s interval works) to see where.
  Potion/mushroom effects are random, so run twice before concluding.
- Title-screen shortcuts: **B** cycles the start level, **UP + A** goes straight to that level's boss
  (skips the level; used to watch boss attacks with Lila idle: `sim.mjs "... down ArrowUp; press z; up ArrowUp; ..."`).
- `node tools/checklevels.mjs [path]` validates `levels.ts` (row widths, hazard row, platform/flyer
  placement rules below; default: the root file, pass `odyssee/levels.ts` for the Ulysses game). Run it
  after touching a level; building level rows from explicit column coordinates in a script is far more
  reliable than editing the ASCII by eye.
- **Look at the screenshots** (Read the PNG) — most bugs found today were only visible in images:
  font glyphs missing, dialog lines overlapping, a sprite stuck in a pit, wrong HUD font.
- Manual scenario example (story pages need one A press each):
  `SIM_SPEED=4 node tools/sim.mjs "wait 2500; press z; wait 900; press z; wait 500; press z; wait 500; press z; wait 500; press z; wait 2500; hold ArrowRight 5000; shot walk; log"`

The bot (`autoplay.ts`) runs in `control.runInBackground` with `control.millis()` because
`game.onUpdate` handlers and `game.runtime()` are per scene (see gotchas). It idles on the ending
screen; pressing A there calls `control.reset()`, which reloads the simulator page.

## Deploying to the console

```sh
./node_modules/.bin/makecode build       # native UF2
node tools/deploy.mjs                    # flash; `--info` shows HF2 bininfo, `--reset-app` reboots the app
```

Facts:
- While a game runs, the console shows **no disk** (its mass-storage LUN reports no media); it only has a
  vendor-class USB interface speaking **HF2**. `tools/deploy.mjs` sends HF2 `RESET_INTO_BOOTLOADER`
  (cmd 0x0004) over bulk endpoints, waits for `/Volumes/ARCADE-F4` (contains `INFO_UF2.TXT`:
  "UF2 Bootloader v2.8.1 W, Model: ELECFREAKS / Arcade, Board-ID: STM32F412-Arcade", UF2 family
  0x57755a57), copies `binary.uf2` there, and the console reboots into the game. Verified working.
- The `usb` npm package v3 is a Rust binding with a **WebUSB-style API** (`usb.getDevices()`,
  `device.open()`, `claimInterface`, `transferIn/transferOut` returning `{status, data: DataView}`),
  not the old libusb `getDeviceList/findByIds` API. It is CommonJS: load it with `createRequire`.
- HF2 framing: 64-byte packets, byte 0 = flags (`0x40` = last packet of a command, `0x80/0xC0` = serial
  text) | payload length; command = u32 id, u16 tag, 2 reserved bytes, data; response = u16 tag, u8 status,
  u8 info, data.
- **Reliability caveat (verified):** the very first `node tools/deploy.mjs` from app mode worked end to
  end (disk `ARCADE-F4` mounted, game copied, console rebooted into the game). But this bootloader's HF2
  (v2.8.1) is flaky: after it has been reset into bootloader once, further HF2 transfers **Stall**, and the
  MSD disk does not re-mount from software. The robust path for a re-flash is manual: on the console press
  **reset twice** (or replug holding **A**) so `ARCADE-F4` mounts, then run `node tools/deploy.mjs` — it
  detects the already-mounted volume (first branch) and just copies. A plain unplug/replug clears a wedged
  HF2 state and boots whatever app is flashed.

## MakeCode Arcade runtime gotchas (silent, no compiler error)

- `image.font8` has only ASCII glyphs; accented letters render blank. `font.ts` appends Latin-1 glyphs
  (é è ê ë à â ç î ï ô ö ù û ü É È Ê À Ç « ») to `image.font8.data` at startup. `font5` is not patched:
  draw accented text with `font8`. Avoid characters above U+2000 (curly quotes, ellipsis): they switch
  the text to the 12px unicode font.
- `game.showLongText` skips the character after each `\n`, so `"\n\n"` embeds a newline in the next
  line and shifts it down over the following one. Always go through `Story.show`/`Story.tell`, which
  turn `"\n\n"` into `"\n \n"`.
- `game.runtime()` = current **scene** time; dialogs (`showLongText`, `splash`) push a scene, so it
  restarts at 0 inside them, and `game.onUpdate` handlers of the main scene do not run there. Anything
  that must keep going across dialogs uses `control.millis()` + `control.runInBackground`. The previous
  scene's `onShade`/`onPaint` still render behind a dialog (SeeThrough), so time-based overlays must not
  use `game.runtime()` (the level banner uses `control.millis()`).
- Tiles outside the tilemap count as walls: a sprite falling into a pit lands on an invisible floor at the
  map bottom. Levels therefore have a hazard row (`~` = water/lava/storm, tile index `Levels.HAZARD`)
  under the ground, and `Player.update` checks `Levels.tileIndexAt` to trigger the respawn.
- Level design rules (see `levels.ts`, enforced by `tools/checklevels.mjs`): never put a platform above a
  gap or spikes (`^`) nor above the **two** tiles before them — the jump starts there (40 px high, 16 px
  tiles) and bumps the head, so the sprite falls in / lands on the spikes; no platform in rows 0–4 on the
  tile *after* them either (head bump at the apex, fall back). Each of these killed the bot in a loop on
  level 6 before the rule was extended. A flyer above or within 2 tiles of a gap/spikes goes to row 3
  (2-wide gap) or row 2 (3-wide gap, spikes): the jump apex is in row 3, a flyer there is hit every time.
- `^` spikes are a non-wall tile (index `Levels.SPIKES`): `Player.update` checks the tile under the feet
  and calls `hurt` (knockback + invincibility, one heart). Ice levels set `Levels.slippery` and
  `Player.update` eases `vx` instead of setting it.
- Tilemaps are built at runtime from ASCII rows with `tiles.createTilemap(buffer, wallLayerImage,
  tileset, TileScale.Sixteen)` (buffer = u16 width, u16 height, then one tile index per cell; wall layer
  pixel value 2 = wall). No `.jres` tilemap assets are needed.
- `sprites.onOverlap` handlers run in their own fiber; blocking calls (`pause`, `showLongText`) are fine
  there but not inside `game.onUpdate` — wrap flows in `control.runInParallel`.
- A blocking mini-game screen (`Puzzles.run`) works like a dialog: `game.pushScene()`, draw everything
  in a `game.onPaint` callback (renderables are per scene), poll buttons on the press edge with
  `pause(16)`, `game.popScene()`. The previous scene's sprites and physics are frozen meanwhile. Sprite
  overlaps are pixel-based, so a "barrier" sprite must be dense (the gate's curtain is a checkerboard).
  In demo mode (`Autoplay.active`) the puzzle ignores buttons and answers itself after 1.5 s — the bot
  keeps pressing A during `State.Transition`, which would otherwise validate wrong answers.
- `info.setLife` auto-registers a game-over on life zero unless `info.onLifeZero` is set (it is: it
  restarts the level/boss instead).
- `Button.setPressed(bool)` on `controller.A/left/right` synthesizes input (used by the bot); dialogs
  advance on the press edge of A or DOWN.

## Game structure quick reference

`Game.State`: Title → Transition (story dialogs, puzzles) → Playing → (portal) → Boss → next level … → Ending.
Levels are ASCII in `levels.ts` (`#` ground, `=` platform, `^` spikes, `*` star, `h` heart, `p` potion,
`m` mushroom, `?` owl gate (full-height barrier sprite, `Puzzles.GateKind`; the puzzle type is fixed per
level in `Puzzles.kindFor`, content random; 3 failures → the owl shows the answer and opens anyway),
`e` walker, `b` flyer, `P` start, `F` portal, `~` hazard); the boss arena is `Levels.arena`
reused with each level's theme. Themes 0–5 (forest, cave, sky, beach, ice, volcano) select tiles,
background and enemy sprites in `assets.ts` (the three newer tilesets are generated in code by
`groundTile`/`platformTile`). Story pages are indexed by level in `story.ts` (`bossIntro[i]`,
`afterBoss[i]`; the last level uses `ending`).
`player.ts` owns the potion effects (random: super/invincible, tiny, snail, shield bubble sprite, heart,
star rain via `Game.dropStars`) and the mushroom forms (`FORM_BUTTERFLY` flies while A is held,
`FORM_FROG` jumps x1.4, `FORM_RABBIT` runs x1.6); `Player.hudText()` is drawn bottom-left.
Difficulty knobs: `player.ts` constants (speed 70, jump -185, gravity 420, glide 35, invincibility 1.3 s),
per-theme enemy speeds in `enemies.ts`, boss HP/shot cadence in `bosses.ts` (the golem also spawns lava
blobs through `Enemies.spawnWalker`, so Player/Enemy overlaps are handled in the Boss state too).
The demo bot spams magic (220 ms cooldown), so it kills bosses in ~3 s and never sees their specials —
that is not a sign the bosses are too easy for a child.
