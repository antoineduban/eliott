// Sprite kinds for the game
const PlayerKind = SpriteKind.create();
const FruitKind = SpriteKind.create();
// const CheeseKind = SpriteKind.create() // Disabled for now

// Set a nice sky blue background
scene.setBackgroundColor(9);

// Create the player sprite - a cute blond boy face
// Color palette: 1 = white (skin), 5 = yellow (hair), 9 = light blue (eyes), 2 = red (mouth), f = black (pupils)
let playerImage = img`
    . . . . 5 5 5 5 5 5 5 5 . . . .
    . . . 5 5 5 5 5 5 5 5 5 5 . . .
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . .
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 .
    . 5 5 1 1 1 1 1 1 1 1 1 1 5 5 .
    . 5 1 1 1 1 1 1 1 1 1 1 1 1 5 .
    . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
    . 1 1 1 9 1 1 1 1 1 1 9 1 1 1 .
    . 1 1 1 f 1 1 1 1 1 1 f 1 1 1 .
    . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
    . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
    . 1 1 1 1 1 2 1 1 2 1 1 1 1 1 .
    . 1 1 1 1 1 1 2 2 1 1 1 1 1 1 .
    . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
    . . . 1 1 1 1 1 1 1 1 1 1 . . .
    . . . . . 1 1 1 1 1 1 . . . . .
`

let player = sprites.create(playerImage, PlayerKind);
player.left = 10;
player.y = screen.height / 2;
player.setFlag(SpriteFlag.StayInScreen, true);

// Player movement with UP and DOWN
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
	player.vy = -80;
});
controller.up.onEvent(ControllerButtonEvent.Released, function () {
	player.vy = 0;
});
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
	player.vy = 80;
});
controller.down.onEvent(ControllerButtonEvent.Released, function () {
	player.vy = 0;
});

// Define fruit sprites using img template literals (much cleaner!)
// Color palette: . = transparent, 1 = white, 2 = red, 4 = orange, 5 = yellow, 6 = teal, 7 = green, e = brown, f = black

let appleImg = img`
    . . . . . 7 7 . . .
    . . . . . 7 7 7 . .
    . . . . 2 2 . . . .
    . . . 2 2 2 2 . . .
    . . 2 1 2 2 2 2 . .
    . 2 1 2 2 2 2 2 2 .
    . 2 2 2 2 2 2 2 2 .
    . 2 2 2 2 2 2 2 2 .
    . . 2 2 2 2 2 2 . .
    . . . 2 2 2 2 . . .
`

let pineappleImg = img`
    . . . . 7 7 . . . .
    . . 7 7 7 7 7 7 . .
    . . . 7 7 7 7 . . .
    . . . . 5 5 . . . .
    . . . 5 5 5 5 . . .
    . . 4 5 5 5 5 4 . .
    . . 5 5 5 5 5 5 . .
    . . 5 5 4 4 5 5 . .
    . . 5 5 5 5 5 5 . .
    . . 4 5 5 5 5 4 . .
    . . 5 5 5 5 5 5 . .
    . . . 5 5 5 5 . . .
    . . . . 5 5 . . . .
`

let coconutImg = img`
    . . . . e e e e . . . .
    . . . e e e e e e . . .
    . . e e e e e e e e . .
    . e e e f e e f e e e .
    . e e e e e e e e e e .
    . e e e e e e e e e e .
    . e e e e e e e e e e .
    . e e e e f f e e e e .
    . . e e e e e e e e . .
    . . . e e e e e e . . .
    . . . . e e e e . . . .
`

let watermelonImg = img`
    . . . . . . 2 2 . . . . . .
    . . . . . 2 2 2 2 . . . . .
    . . . . 2 2 2 2 2 2 . . . .
    . . . 2 2 f 2 2 f 2 2 . . .
    . . 2 2 2 2 2 f 2 2 2 2 . .
    . 2 2 2 f 2 2 2 2 f 2 2 2 .
    2 2 2 2 2 2 2 2 2 2 2 2 2 2
    1 1 1 1 1 1 1 1 1 1 1 1 1 1
    7 7 7 7 7 7 7 7 7 7 7 7 7 7
    6 6 6 6 6 6 6 6 6 6 6 6 6 6
`

// Spawn fruits every 1 second
game.onUpdateInterval(1000, function () {
    const fruitType = randint(1, 4);
    let fruitImg: Image;

    if (fruitType === 1) {
        fruitImg = appleImg;
    } else if (fruitType === 2) {
        fruitImg = pineappleImg;
    } else if (fruitType === 3) {
        fruitImg = coconutImg;
    } else {
        fruitImg = watermelonImg;
    }

    const fruit = sprites.create(fruitImg, FruitKind);
    fruit.x = 155;
    fruit.y = randint(15, 105);
    fruit.vx = -50;
    fruit.setFlag(SpriteFlag.AutoDestroy, true);
});

// COLLISION: Player catches fruit = +1 POINT!
sprites.onOverlap(PlayerKind, FruitKind, function (sprite, fruit) {
	fruit.destroy(effects.spray, 100);
	info.changeScoreBy(1);
	music.baDing.play();
});

// Initialize score
info.setScore(0);
