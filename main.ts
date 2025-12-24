// ============================================
// ELIOTT'S GAME LAUNCHER
// ============================================

// Game state
let currentGame = 0 // 0 = menu, 1 = fruit catcher, 2 = space shooter
let menuSelection = 0
const TOTAL_GAMES = 2

// Menu cursor
const cursorImg = img`
    . . 2 . . . . .
    . . 2 2 . . . .
    . . 2 2 2 . . .
    . . 2 2 2 2 . .
    . . 2 2 2 2 2 .
    . . 2 2 2 2 . .
    . . 2 2 2 . . .
    . . 2 2 . . . .
    . . 2 . . . . .
`

const MenuCursorKind = SpriteKind.create()
let menuCursor: Sprite

// ============================================
// MENU FUNCTIONS
// ============================================

function showMenu() {
    currentGame = 0

    // Clear all sprites
    sprites.destroyAllSpritesOfKind(FruitCatcher.PlayerKind)
    sprites.destroyAllSpritesOfKind(FruitCatcher.FruitKind)
    sprites.destroyAllSpritesOfKind(FruitCatcher.CheeseKind)
    sprites.destroyAllSpritesOfKind(SpaceShooter.ShipKind)
    sprites.destroyAllSpritesOfKind(SpaceShooter.LaserKind)
    sprites.destroyAllSpritesOfKind(SpaceShooter.AsteroidKind)
    sprites.destroyAllSpritesOfKind(SpaceShooter.AlienKind)
    sprites.destroyAllSpritesOfKind(SpaceShooter.CucumberKind)
    sprites.destroyAllSpritesOfKind(MenuCursorKind)

    // Stop any screen effects
    effects.starField.endScreenEffect()

    // Dark background for menu
    scene.setBackgroundColor(15)

    // Show title
    game.splash("ELIOTT'S GAMES", "Use UP/DOWN, press A!")

    // Menu screen
    scene.setBackgroundColor(15)

    // Create cursor
    menuCursor = sprites.create(cursorImg, MenuCursorKind)
    menuCursor.x = 25
    updateMenuCursor()
}

function updateMenuCursor() {
    menuCursor.y = 45 + menuSelection * 25
}

function startSelectedGame() {
    // Destroy menu cursor
    sprites.destroyAllSpritesOfKind(MenuCursorKind)

    if (menuSelection === 0) {
        currentGame = 1
        FruitCatcher.start()
    } else if (menuSelection === 1) {
        currentGame = 2
        SpaceShooter.start()
    }
}

// ============================================
// CONTROLS
// ============================================

// UP button
controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
    if (currentGame === 0) {
        menuSelection = (menuSelection - 1 + TOTAL_GAMES) % TOTAL_GAMES
        updateMenuCursor()
        music.baDing.play()
    } else if (currentGame === 1) {
        FruitCatcher.handleUp(true)
    }
})

controller.up.onEvent(ControllerButtonEvent.Released, () => {
    if (currentGame === 1) {
        FruitCatcher.handleUp(false)
    }
})

// DOWN button
controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
    if (currentGame === 0) {
        menuSelection = (menuSelection + 1) % TOTAL_GAMES
        updateMenuCursor()
        music.baDing.play()
    } else if (currentGame === 1) {
        FruitCatcher.handleDown(true)
    }
})

controller.down.onEvent(ControllerButtonEvent.Released, () => {
    if (currentGame === 1) {
        FruitCatcher.handleDown(false)
    }
})

// LEFT button
controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
    if (currentGame === 2) {
        SpaceShooter.handleLeft(true)
    }
})

controller.left.onEvent(ControllerButtonEvent.Released, () => {
    if (currentGame === 2) {
        SpaceShooter.handleLeft(false)
    }
})

// RIGHT button
controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
    if (currentGame === 2) {
        SpaceShooter.handleRight(true)
    }
})

controller.right.onEvent(ControllerButtonEvent.Released, () => {
    if (currentGame === 2) {
        SpaceShooter.handleRight(false)
    }
})

// A button (select / shoot)
controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
    if (currentGame === 0) {
        startSelectedGame()
    } else if (currentGame === 2) {
        SpaceShooter.handleShoot()
    }
})

// ============================================
// SPAWNING LOOPS
// ============================================

// Fruit Catcher spawning
game.onUpdateInterval(1000, () => {
    if (currentGame === 1) {
        FruitCatcher.spawnFruit()
    }
})

game.onUpdateInterval(3500, () => {
    if (currentGame === 1) {
        FruitCatcher.spawnCheese()
    }
})

// Space Shooter spawning
game.onUpdateInterval(1500, () => {
    if (currentGame === 2) {
        SpaceShooter.spawnAsteroid()
    }
})

game.onUpdateInterval(3000, () => {
    if (currentGame === 2) {
        SpaceShooter.spawnAlien()
    }
})

// Cucumber spawning (health pickup)
game.onUpdateInterval(5000, () => {
    if (currentGame === 2) {
        SpaceShooter.spawnCucumber()
    }
})

// ============================================
// GAME OVER -> RESTART
// ============================================

// Configure game over screen to show score and allow replay
game.setGameOverScoringType(game.ScoringType.HighScore)

// ============================================
// DRAW MENU TEXT
// ============================================

game.onPaint(() => {
    if (currentGame === 0) {
        image
            .screenImage()
            .printCenter("1. FRUITS ET FROMAGE", 40, 1, image.font8)
        image
            .screenImage()
            .printCenter("2. VAISSEAU SPATIAL", 65, 1, image.font8)
    }
})

// ============================================
// START!
// ============================================

showMenu()
