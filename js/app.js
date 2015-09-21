//Creating the enemies for the game. grabbing the image and the lanes they will use.
var Enemy = function(speed) {
    this.x = -50;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.enemyLanes = [60, 143, 225];
    this.top = function() {
        return this.y + 79;
    };
    this.right = function() {
        return this.x + 95;
    };
    this.bottom = function() {
        return this.y + 100;
    };
    this.left = function() {
        return this.x + 7;
    };
};

//Selecting the speed of the bug and the range where the player could die if they touch the bug.
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 500) {
        this.x = -100;
        this.speed = Math.round(Math.random() * 250);
        while (this.speed < 80) {
            this.speed = Math.round(Math.random() * 250);
        }
        this.y = this.enemyLanes[Math.floor(Math.random() * this.enemyLanes.length)];
    }
    if (!(this.top() > player.bottom() ||
            this.left() > player.right() ||
            this.bottom() < player.top() ||
            this.right() < player.left())) {
        player.death = true;
    }
};

//grabbing the image of the bug for the game.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//making the player for the game.
var Player = function(x, y) {
    this.sprite = "images/char-boy.png";
    death = false;
    this.top = function() {
        return this.y + 64;
    };
    this.right = function() {
        return this.x + 84;
    };
    this.bottom = function() {
        return this.y + 138;
    };
    this.left = function() {
        return this.x + 17;
    };
};

//if the player hits the ocean, they will restart.
Player.prototype.update = function() {
    if (this.y < 30) {
        this.death = true;
    }
};
//placing the player on the map when they die and grabbing the image of the player.
Player.prototype.render = function() {
    if (this.death) {
        var vertical = 200;
        var horizontal = 380;
        this.x = vertical;
        this.y = horizontal;
        this.death = false;
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//the keys for the player to move the character on the board
Player.prototype.handleInput = function(e) {
    switch (e) {
        case "left":
            if (this.x > 90) {
                this.x -= 100;
            }
            break;

        case "up":
            if (this.y > 0) {
                this.y -= 85;
            }
            break;

        case "right":
            if (this.x < 400) {
                this.x += 100;
            }
            break;

        case "down":
            if (this.y + 85 < 400) {
                this.y += 85;
            }
            break;
    }
};

var player = new Player(200, 380);
var allEnemies = [];

//if the enemy goes off the screen and how many will be on the screen.
var pushEnemies = (function() {
    var newEnemies = 5;
    for (var i = 0; i < newEnemies; i++) {
        var speed = 0;
        while (speed < 85) {
            speed = Math.round(Math.random() * 250);
        }
        allEnemies.push(new Enemy(speed, i));
    }
});

//keys for the player
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

//preventing the screen to move when they click up or down.
window.addEventListener("keydown", function(e) {
    if ([38, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

pushEnemies();