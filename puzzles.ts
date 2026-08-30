// ============================================
// LES ÉNIGMES DU HIBOU SAVANT
// Une porte magique bloque le chemin : il faut résoudre une petite énigme
// (compter les étoiles, trouver l'intrus, continuer la suite, répéter la
// mélodie des cristaux). Jeu différent : on choisit avec les flèches et A.
// Après trois erreurs, le hibou montre la réponse : on n'est jamais bloqué.
// ============================================

// biome-ignore lint/correctness/noUnusedVariables: utilisé par main.ts
namespace Puzzles {
    export const GateKind = SpriteKind.create()
    export let active = false
    let introduced = false

    const KIND_COUNT = 0 // compter les étoiles
    const KIND_ODD = 1 // l'intrus
    const KIND_PATTERN = 2 // suite logique
    const KIND_SIMON = 3 // mémo des cristaux

    const MAX_TRIES = 3
    const BOT_DELAY_MS = 1500 // en mode démo, le robot répond tout seul

    // Ce qui est affiché
    let question = ""
    let topRow: Image[] = [] // la suite à continuer (le dernier est un "?")
    let choices: Image[] = [] // réponses en images...
    let choiceTexts: string[] = [] // ... ou en texte (nombres)
    let cursor = 0
    let correct = 0
    let message = ""
    let messageColor = 5
    let starsX: number[] = []
    let starsY: number[] = []
    let lit = -1 // cristal allumé
    let simonLen = 0
    let simonPos = 0
    let bigFont: image.Font = null

    // Cristaux : haut, gauche, droite, bas (comme les flèches)
    const CRYSTAL_X = [80, 46, 114, 80]
    const CRYSTAL_Y = [38, 64, 64, 90]
    const CRYSTAL_COLOR = [2, 7, 9, 5]
    const CRYSTAL_TONE = [262, 330, 392, 523]

    function icons(): Image[] {
        return [
            Assets.star,
            Assets.heart,
            Assets.magicMushroom,
            Assets.potionItem,
            Assets.coconut,
            Assets.snowball,
        ]
    }

    function shuffle(a: number[]) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = randint(0, i)
            const t = a[i]
            a[i] = a[j]
            a[j] = t
        }
    }

    // Une énigme par niveau, de plus en plus futée
    function kindFor(level: number): number {
        const order = [
            KIND_COUNT,
            KIND_ODD,
            KIND_PATTERN,
            KIND_SIMON,
            KIND_PATTERN,
            KIND_SIMON,
        ]
        return order[level % order.length]
    }

    // La porte de pierre avec un point d'interrogation, surmontée d'un rideau
    // magique jusqu'au plafond : impossible de passer sans répondre
    export function gateImage(): Image {
        const im = image.create(20, 112)
        // rideau scintillant (assez dense pour que Lila le touche partout)
        for (let y = 0; y < 84; y++) {
            for (let x = 2; x < 18; x++) {
                if ((x + y) % 2 === 0)
                    im.setPixel(x, y, (x * 3 + y) % 7 === 0 ? 1 : 10)
            }
        }
        // la porte
        const top = 84
        im.fillRect(0, top + 6, 20, 22, 12)
        im.fillCircle(10, top + 8, 9, 12)
        im.fillRect(2, top + 8, 16, 20, 11)
        im.fillCircle(10, top + 9, 7, 11)
        im.fillRect(9, top + 12, 2, 16, 12)
        im.fillRect(3, top + 19, 14, 1, 12)
        im.print("?", 7, top + 10, 5, image.font8)
        return im
    }

    // ---------- Préparation des énigmes ----------
    function setupCount(level: number) {
        question = "Combien d'étoiles ?"
        const n =
            level < 2
                ? randint(2, 4)
                : level < 4
                  ? randint(3, 6)
                  : randint(4, 8)
        // cases d'une grille, mélangées, avec un petit décalage
        const cells: number[] = []
        for (let i = 0; i < 18; i++) cells.push(i)
        shuffle(cells)
        starsX = []
        starsY = []
        for (let i = 0; i < n; i++) {
            const c = cells[i]
            starsX.push(26 + (c % 6) * 19 + randint(-2, 2))
            starsY.push(29 + Math.idiv(c, 6) * 13 + randint(-1, 1))
        }
        const lo = Math.max(1, n - 1)
        const nums = [lo, lo + 1, lo + 2]
        shuffle(nums)
        choiceTexts = []
        choices = []
        for (let i = 0; i < 3; i++) {
            choiceTexts.push(`${nums[i]}`)
            if (nums[i] === n) correct = i
        }
        topRow = []
    }

    function setupOdd(_level: number) {
        question = "Trouve l'intrus !"
        const ids = [0, 1, 2, 3, 4, 5]
        shuffle(ids)
        const all = icons()
        correct = randint(0, 3)
        choices = []
        choiceTexts = []
        for (let i = 0; i < 4; i++) {
            choices.push(all[i === correct ? ids[1] : ids[0]])
        }
        topRow = []
        starsX = []
    }

    function setupPattern(level: number) {
        question = "Continue la suite !"
        const ids = [0, 1, 2, 3, 4, 5]
        shuffle(ids)
        const all = icons()
        // ABAB pour commencer, puis AABB ou ABC
        const type = level < 4 ? 0 : randint(0, 2)
        let motif: number[] = []
        if (type === 0) motif = [ids[0], ids[1]]
        else if (type === 1) motif = [ids[0], ids[0], ids[1], ids[1]]
        else motif = [ids[0], ids[1], ids[2]]
        topRow = []
        const shown = 5
        for (let i = 0; i < shown; i++)
            topRow.push(all[motif[i % motif.length]])
        const answer = motif[shown % motif.length]
        // 3 réponses : la bonne + deux autres (dont une du motif si possible)
        const options = [answer]
        for (const id of ids) {
            if (options.length >= 3) break
            if (options.indexOf(id) < 0) options.push(id)
        }
        shuffle(options)
        choices = []
        choiceTexts = []
        for (let i = 0; i < 3; i++) {
            choices.push(all[options[i]])
            if (options[i] === answer) correct = i
        }
        starsX = []
    }

    // ---------- Affichage ----------
    function drawIconCentered(im: Image, cx: number, cy: number) {
        screen.drawTransparentImage(
            im,
            cx - (im.width >> 1),
            cy - (im.height >> 1),
        )
    }

    function drawCrystal(i: number) {
        const x = CRYSTAL_X[i]
        const y = CRYSTAL_Y[i]
        const on = lit === i
        const col = on ? CRYSTAL_COLOR[i] : 12
        screen.fillTriangle(x, y - 12, x - 10, y, x + 10, y, col)
        screen.fillTriangle(x, y + 12, x - 10, y, x + 10, y, col)
        if (on) {
            screen.fillTriangle(x - 1, y - 8, x - 6, y - 1, x - 1, y - 1, 1)
        } else {
            screen.fillTriangle(x, y - 5, x - 4, y, x + 4, y, CRYSTAL_COLOR[i])
            screen.fillTriangle(x, y + 5, x - 4, y, x + 4, y, CRYSTAL_COLOR[i])
        }
    }

    function draw(kind: number) {
        screen.fillRect(0, 0, 160, 120, 8)
        screen.drawRect(1, 1, 158, 118, 5)
        screen.drawTransparentImage(Assets.owl[0], 4, 3)
        screen.print("Le Hibou Savant", 24, 4, 1, image.font8)
        screen.printCenter(question, 18, 5, image.font8)

        if (kind === KIND_COUNT) {
            screen.fillRect(20, 27, 120, 40, 15)
            for (let i = 0; i < starsX.length; i++) {
                screen.drawTransparentImage(Assets.star, starsX[i], starsY[i])
            }
        } else if (kind === KIND_PATTERN) {
            const n = topRow.length + 1
            const x0 = 80 - n * 10
            for (let i = 0; i < n; i++) {
                const cx = x0 + i * 20 + 10
                screen.fillRect(cx - 9, 32, 18, 18, 15)
                if (i < topRow.length) drawIconCentered(topRow[i], cx, 41)
                else screen.print("?", cx - 3, 37, 5, image.font8)
            }
        }

        if (kind === KIND_SIMON) {
            for (let i = 0; i < 4; i++) drawCrystal(i)
            // progression des réponses
            for (let i = 0; i < simonLen; i++) {
                const x = 80 - simonLen * 5 + i * 10
                if (i < simonPos) screen.fillRect(x, 108, 6, 4, 5)
                else screen.drawRect(x, 108, 6, 4, 5)
            }
        } else {
            const n = choices.length > 0 ? choices.length : choiceTexts.length
            const step = 34
            const x0 = 80 - Math.idiv(n * step, 2)
            for (let i = 0; i < n; i++) {
                const cx = x0 + i * step + step / 2
                const cy = kind === KIND_ODD ? 62 : 84
                screen.fillRect(cx - 12, cy - 12, 24, 24, 15)
                if (choices.length > 0) drawIconCentered(choices[i], cx, cy)
                else screen.print(choiceTexts[i], cx - 6, cy - 8, 1, bigFont)
                if (
                    i === cursor &&
                    Math.idiv(control.millis(), 250) % 2 === 0
                ) {
                    screen.drawRect(cx - 14, cy - 14, 28, 28, 5)
                    screen.drawRect(cx - 15, cy - 15, 30, 30, 5)
                }
            }
        }

        if (message.length > 0) {
            screen.fillRect(0, 102, 160, 14, 15)
            screen.printCenter(message, 105, messageColor, image.font8)
        }
    }

    // ---------- Lecture des boutons (front montant) ----------
    let prevL = false
    let prevR = false
    let prevU = false
    let prevD = false
    let prevA = false

    function syncInput() {
        prevL = controller.left.isPressed()
        prevR = controller.right.isPressed()
        prevU = controller.up.isPressed()
        prevD = controller.down.isPressed()
        prevA = controller.A.isPressed()
    }

    function readInput(): string {
        const l = controller.left.isPressed()
        const r = controller.right.isPressed()
        const u = controller.up.isPressed()
        const d = controller.down.isPressed()
        const a = controller.A.isPressed()
        let out = ""
        if (l && !prevL) out = "L"
        else if (r && !prevR) out = "R"
        else if (u && !prevU) out = "U"
        else if (d && !prevD) out = "D"
        else if (a && !prevA) out = "A"
        prevL = l
        prevR = r
        prevU = u
        prevD = d
        prevA = a
        return out
    }

    function say(text: string, color: number, ms: number) {
        message = text
        messageColor = color
        pause(ms)
        message = ""
    }

    // ---------- Énigmes à choix ----------
    function playChoice(kind: number, level: number): boolean {
        if (kind === KIND_COUNT) setupCount(level)
        else if (kind === KIND_ODD) setupOdd(level)
        else setupPattern(level)
        const n = choices.length > 0 ? choices.length : choiceTexts.length
        cursor = 0
        let tries = 0
        const start = control.millis()
        syncInput()
        while (true) {
            pause(16)
            let inp = ""
            if (Autoplay.active) {
                if (control.millis() - start > BOT_DELAY_MS) {
                    cursor = correct
                    inp = "A"
                }
            } else {
                inp = readInput()
            }
            if (inp === "L" || inp === "R") {
                cursor = (cursor + (inp === "L" ? n - 1 : 1)) % n
                music.playTone(440, 40)
            } else if (inp === "A") {
                if (cursor === correct) {
                    music.powerUp.play()
                    say("Bravo !", 7, 1000)
                    return true
                }
                tries++
                music.wawawawaa.play()
                if (tries >= MAX_TRIES) {
                    say("Regarde bien...", 5, 900)
                    cursor = correct
                    say("C'est celle-là !", 7, 1500)
                    return true
                }
                say("Essaie encore !", 2, 900)
            }
        }
    }

    // ---------- Mémo des cristaux ----------
    function playback(seq: number[]) {
        pause(400)
        for (const c of seq) {
            lit = c
            music.playTone(CRYSTAL_TONE[c], 350)
            lit = -1
            pause(180)
        }
    }

    function playSimon(level: number): boolean {
        simonLen = level < 4 ? 3 : 4
        const seq: number[] = []
        for (let i = 0; i < simonLen; i++) seq.push(randint(0, 3))
        let tries = 0
        while (true) {
            question = "Regarde bien..."
            simonPos = 0
            playback(seq)
            question = "À toi ! (flèches)"
            let failed = false
            const start = control.millis()
            syncInput()
            while (simonPos < simonLen && !failed) {
                pause(16)
                let dir = -1
                if (Autoplay.active) {
                    if (control.millis() - start > 500 * (simonPos + 1))
                        dir = seq[simonPos]
                } else {
                    const inp = readInput()
                    if (inp === "U") dir = 0
                    else if (inp === "L") dir = 1
                    else if (inp === "R") dir = 2
                    else if (inp === "D") dir = 3
                }
                if (dir < 0) continue
                lit = dir
                music.playTone(CRYSTAL_TONE[dir], 250)
                lit = -1
                if (dir === seq[simonPos]) simonPos++
                else failed = true
            }
            if (!failed) {
                music.powerUp.play()
                say("Bravo !", 7, 1000)
                return true
            }
            tries++
            music.wawawawaa.play()
            if (tries >= MAX_TRIES) {
                say("Regarde, c'est comme ça", 5, 900)
                playback(seq)
                pause(400)
                return true
            }
            say("Oh non ! Regarde encore", 2, 1000)
        }
    }

    // ---------- Lancement (depuis une fibre : bloque jusqu'à la fin) ----------
    export function run(level: number): boolean {
        active = true
        if (!bigFont) bigFont = image.doubledFont(image.font8)
        if (!introduced) {
            introduced = true
            Story.tell(Story.owlIntro)
        }
        const kind = kindFor(level)
        message = ""
        lit = -1
        simonLen = 0
        game.pushScene()
        scene.setBackgroundColor(8)
        game.onPaint(() => draw(kind))
        let ok = false
        if (kind === KIND_SIMON) ok = playSimon(level)
        else ok = playChoice(kind, level)
        game.popScene()
        active = false
        return ok
    }
}
