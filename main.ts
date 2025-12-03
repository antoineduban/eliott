// Sprite kinds for the game
const PlayerKind = SpriteKind.create();
const CheeseKind = SpriteKind.create();  // Obstacles - yucky cheese!
const FruitKind = SpriteKind.create();   // Good stuff - delicious fruits!

// Set a nice sky blue background
scene.setBackgroundColor(9);

showControls();
startGame();

function showControls() {
    game.showLongText(
        "Use UP/DOWN to move\n \nCatch fruits for points!\n \nAvoid the cheese!",
        DialogLayout.Center
    );
}

function startGame() {
    // Create the player sprite (a colorful square for now)
    // We'll draw a simple player - can be replaced with Eliott's face later!
    const playerImage = image.create(16, 16);
    playerImage.fill(7);  // White fill
    playerImage.drawRect(0, 0, 16, 16, 8);  // Red border
    // Add a simple smiley face
    playerImage.setPixel(4, 5, 15);   // Left eye
    playerImage.setPixel(11, 5, 15);  // Right eye
    playerImage.setPixel(4, 10, 15);  // Smile left
    playerImage.setPixel(5, 11, 15);
    playerImage.setPixel(6, 11, 15);
    playerImage.setPixel(7, 11, 15);
    playerImage.setPixel(8, 11, 15);
    playerImage.setPixel(9, 11, 15);
    playerImage.setPixel(10, 11, 15);
    playerImage.setPixel(11, 10, 15); // Smile right

    const player = sprites.create(playerImage, PlayerKind);
    player.left = 10;
    player.y = screen.height / 2;
    player.setFlag(SpriteFlag.StayInScreen, true);

    // Player movement with UP and DOWN
    controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
        player.vy = -80;
    });
    controller.up.onEvent(ControllerButtonEvent.Released, () => {
        if (player.vy < 0) player.vy = 0;
    });
    controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
        player.vy = 80;
    });
    controller.down.onEvent(ControllerButtonEvent.Released, () => {
        if (player.vy > 0) player.vy = 0;
    });

    // Spawn cheese obstacles every 1.5 seconds
    game.onUpdateInterval(1500, () => {
        spawnCheese();
    });

    // Spawn fruits every 2 seconds
    game.onUpdateInterval(2000, () => {
        spawnFruit();
    });

    // COLLISION: Player hits cheese = GAME OVER!
    sprites.onOverlap(PlayerKind, CheeseKind, (sprite, cheese) => {
        cheese.destroy(effects.disintegrate, 200);
        game.over(false);  // false = player lost
    });

    // COLLISION: Player catches fruit = +1 POINT!
    sprites.onOverlap(PlayerKind, FruitKind, (sprite, fruit) => {
        fruit.destroy(effects.spray, 100);
        info.changeScoreBy(1);
        music.baDing.play();
    });

    // Initialize score
    info.setScore(0);
}

function spawnCheese() {
    // Create a cheese obstacle (yellow square placeholder)
    const cheeseImage = image.create(12, 12);
    cheeseImage.fill(5);  // Yellow fill for cheese
    cheeseImage.drawRect(0, 0, 12, 12, 4);  // Orange border
    // Add some holes to make it look like cheese
    cheeseImage.setPixel(3, 3, 0);
    cheeseImage.setPixel(8, 5, 0);
    cheeseImage.setPixel(5, 8, 0);
    cheeseImage.setPixel(9, 9, 0);

    const cheese = sprites.create(cheeseImage, CheeseKind);
    cheese.right = screen.width + 12;
    cheese.y = randint(10, screen.height - 10);
    cheese.vx = -60;  // Move left
    cheese.setFlag(SpriteFlag.AutoDestroy, true);
}

function spawnFruit() {
    // Create a fruit (red circle-ish - apple placeholder)
    const fruitImage = image.create(10, 10);
    // Draw a simple apple shape
    fruitImage.fillRect(3, 2, 4, 7, 2);  // Red body
    fruitImage.fillRect(2, 3, 6, 5, 2);
    fruitImage.fillRect(4, 1, 2, 2, 7);  // White highlight
    fruitImage.setPixel(5, 0, 6);  // Green stem

    const fruit = sprites.create(fruitImage, FruitKind);
    fruit.right = screen.width + 10;
    fruit.y = randint(10, screen.height - 10);
    fruit.vx = -50;  // Move left (slightly slower than cheese)
    fruit.setFlag(SpriteFlag.AutoDestroy, true);
}
