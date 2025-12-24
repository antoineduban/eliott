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
    // game.onUpdateInterval(1500, () => {
    //     spawnCheese();
    // });

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
    // Randomly pick a fruit type
    const fruitType = randint(0, 3);
    let fruitImage: Image;

    if (fruitType === 0) {
        // Apple (small - 10x10)
        fruitImage = image.create(10, 10);
        fruitImage.fillRect(3, 2, 4, 7, 2);  // Red body
        fruitImage.fillRect(2, 3, 6, 5, 2);
        fruitImage.fillRect(4, 1, 2, 2, 7);  // White highlight
        fruitImage.setPixel(5, 0, 6);  // Green stem
    } else if (fruitType === 1) {
        // Pineapple (tall - 10x16)
        fruitImage = image.create(10, 16);
        // Green leaves on top
        fruitImage.fillRect(4, 0, 2, 3, 7);
        fruitImage.fillRect(3, 1, 4, 2, 7);
        fruitImage.fillRect(2, 2, 6, 2, 7);
        // Yellow body
        fruitImage.fillRect(2, 4, 6, 10, 5);
        fruitImage.fillRect(3, 4, 4, 11, 5);
        // Diamond pattern (orange)
        fruitImage.setPixel(3, 6, 4);
        fruitImage.setPixel(6, 6, 4);
        fruitImage.setPixel(4, 8, 4);
        fruitImage.setPixel(5, 8, 4);
        fruitImage.setPixel(3, 10, 4);
        fruitImage.setPixel(6, 10, 4);
        fruitImage.setPixel(4, 12, 4);
        fruitImage.setPixel(5, 12, 4);
    } else if (fruitType === 2) {
        // Coconut (medium - 12x12)
        fruitImage = image.create(12, 12);
        // Brown round body
        fruitImage.fillRect(3, 1, 6, 10, 14);
        fruitImage.fillRect(2, 2, 8, 8, 14);
        fruitImage.fillRect(1, 3, 10, 6, 14);
        // Three dark spots (eyes and mouth of coconut)
        fruitImage.setPixel(4, 4, 15);
        fruitImage.setPixel(7, 4, 15);
        fruitImage.setPixel(5, 6, 15);
        fruitImage.setPixel(6, 6, 15);
    } else {
        // Watermelon slice (large - 16x12)
        fruitImage = image.create(16, 12);
        // Green rind (outer curve)
        fruitImage.fillRect(1, 8, 14, 3, 6);
        fruitImage.fillRect(0, 9, 16, 2, 6);
        // Light green inner rind
        fruitImage.fillRect(2, 6, 12, 2, 7);
        fruitImage.fillRect(1, 7, 14, 2, 7);
        // Red flesh
        fruitImage.fillRect(3, 2, 10, 4, 2);
        fruitImage.fillRect(2, 3, 12, 3, 2);
        fruitImage.fillRect(4, 1, 8, 2, 2);
        // Black seeds
        fruitImage.setPixel(5, 3, 15);
        fruitImage.setPixel(8, 4, 15);
        fruitImage.setPixel(11, 3, 15);
        fruitImage.setPixel(6, 5, 15);
        fruitImage.setPixel(10, 5, 15);
    }

    const fruit = sprites.create(fruitImage, FruitKind);
    fruit.right = screen.width + 16;
    fruit.y = randint(12, screen.height - 12);
    fruit.vx = -50;
    fruit.setFlag(SpriteFlag.AutoDestroy, true);
}
