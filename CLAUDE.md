# Notes for agents working on this repo

MakeCode Arcade project (static TypeScript) for a kid's handheld: an **ELECFREAKS Arcade** console
(STM32F412 board, MakeCode hardware variant `stm32f401`). On USB it appears as "Arcade (app)"
(VID `0x0483` / PID `0x5799`) while a MakeCode game runs, and as ELECFREAKS "Arcade"
(VID `0x26AC` / PID `0x1043`) in bootloader mode.
The current game is **"Lila la fée"**, a French platformer (see `README.md` for the player-facing
description and file map). The two older games are kept in `archive/` and are **not** compiled
(not listed in `pxt.json`).

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
- `tools/play.mjs [maxGameSeconds] [shotEverySeconds]` starts the in-game **demo bot** (title screen:
  hold DOWN + press A → `Autoplay.start()`), streams the game's log lines (`LEVEL n START`, `STAR k`,
  `PORTAL`, `BOSS ... hp=n`, `BOSS n DEFEATED`, `DEFEAT`, `VICTOIRE`) and stops on `VICTOIRE`.
  A full run of the game takes ~80–120 s of game time ≈ 20–30 s real at x4. Use it after any gameplay
  change; if the bot gets stuck, look at the periodic screenshots to see where.
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
- Level design rule (see `levels.ts`): never put a platform directly above a gap or above the tile before
  it — the jump (40 px high, 16 px tiles) bumps the head and the sprite falls in.
- Tilemaps are built at runtime from ASCII rows with `tiles.createTilemap(buffer, wallLayerImage,
  tileset, TileScale.Sixteen)` (buffer = u16 width, u16 height, then one tile index per cell; wall layer
  pixel value 2 = wall). No `.jres` tilemap assets are needed.
- `sprites.onOverlap` handlers run in their own fiber; blocking calls (`pause`, `showLongText`) are fine
  there but not inside `game.onUpdate` — wrap flows in `control.runInParallel`.
- `info.setLife` auto-registers a game-over on life zero unless `info.onLifeZero` is set (it is: it
  restarts the level/boss instead).
- `Button.setPressed(bool)` on `controller.A/left/right` synthesizes input (used by the bot); dialogs
  advance on the press edge of A or DOWN.

## Game structure quick reference

`Game.State`: Title → Transition (story dialogs) → Playing → (portal) → Boss → next level … → Ending.
Levels are ASCII in `levels.ts` (`#` ground, `=` platform, `*` star, `h` heart, `e` walker, `b` flyer,
`P` start, `F` portal, `~` hazard); the boss arena is `Levels.arena` reused with each level's theme.
Difficulty knobs: `player.ts` constants (speed 70, jump -185, gravity 420, glide 35, invincibility 1.5 s),
enemy speeds in `enemies.ts`, boss HP/shot cadence in `bosses.ts`.
