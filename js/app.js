// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};
let counter = 0;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > 504) {
        this.x = -100;
    }

    if (player.x < this.x + 50 && player.x > this.x - 50 && player.y < this.y + 40 && player.y > this.y - 40) {
        player.x = 200;
        player.y = 380;
        reduceLife();
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Player {
    constructor(x, y, stepx, stepy) {
        this.x = x;
        this.y = y;
        this.stepx = stepx;
        this.stepy = stepy;
        this.sprite = 'images/char-boy.png';
    }
    update() {
        if (this.x > 400) {
            this.x = 400;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y > 380) {
            this.y = 380;
        }
        if (this.y < 40) {
            counter++;
            if (counter == 15) {
                let modal = document.querySelector(".modal");
                let modalContent = document.querySelector(".modal-container");
                modalContent.classList.remove("hidden");
                modal.classList.add("green");
                modal.innerText = "YOU WIN!"
            }

            document.querySelector(".win-counter").innerHTML = counter;
            this.y = 380;

        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(keyCode) {
        switch (keyCode) {
            case 'left':
                this.x -= this.stepx;
                break;
            case 'up':
                this.y -= this.stepy;
                break;
            case 'right':
                this.x += this.stepx;
                break;
            case 'down':
                this.y += this.stepy;
                break;
        }
    }
}

const randomize = (max) => {
    let random = Math.floor(Math.random() * Math.floor(max)) + 1;
    return random;
}

const reduceLife = () => {
    let [...lives] = document.querySelectorAll(".lives .heart");
    let life = lives[lives.length - 1];
    life.classList.add("hidden");
    life.classList.remove("heart");
    if (lives.length == 1) {
        let modal = document.querySelector(".modal");
        let modalContent = document.querySelector(".modal-container");
        modalContent.classList.remove("hidden");
        modal.classList.add("red");
        modal.innerText = "YOU LOOSE!"
    }
}
const restartGame = () => {
    let [...lives] = document.querySelectorAll(".lives .hidden");
    counter = 0;
    document.querySelector(".win-counter").innerHTML = counter;
    allEnemies = [];
    for (let i = 0; i < 3; i++) {
        let x = -100 + randomize(3) * 40;
        let y = [50, 135, 220];
        let speed = randomize(6) * 40 + randomize(3) * 50;
        let enemy = new Enemy(x, y[i], speed);
        allEnemies.push(enemy);
    }
    lives.forEach((el) => {
        el.classList.remove('hidden');
        el.classList.add("heart");
    });
    let modalContent = document.querySelector(".modal-container");
    modalContent.classList.add("hidden");
    player = new Player(200, 380, 100, 85);
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(200, 380, 100, 85);
let restart = document.querySelector(".restart");
for (let i = 0; i < 3; i++) {
    let x = -100 + randomize(3) * 40;
    let y = [50, 135, 220];
    let speed = randomize(6) * 40 + randomize(3) * 50;
    let enemy = new Enemy(x, y[i], speed);
    allEnemies.push(enemy);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    console.log(counter);
    player.handleInput(allowedKeys[e.keyCode]);
});
restart.addEventListener('click', restartGame);