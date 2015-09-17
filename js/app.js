var Enemy = function(x,y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y; 
    this.speed = (Math.random() * 2) + 1;
    this.width = 80;
    this.height = 80;
}

Enemy.prototype.update = function(dt) {
    this.x += dt * this.speed;
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Player = function (x,y) {
    this.sprite = "images/char-boy.png";
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
}

Player.prototype.update = function(dt) {
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(e) {
    switch (e) {
        case "left":
        if (this.x == 0){ 
            break; 
        }
        this.x -= 80;
        break;
        
        case "up":
        
        if(this.y == 100) {
            break;
        };
        this.y -= 80;
        break;
        
        case "right":
        if(this.x == 500) { 
            break; 
        } 
        this.x += 80;
        break;
        
        case "down":
        if(this.y == 600) { 
            break;
        } 
        this.y += 80;
        break;
    }
}

var player = new Player(200,380);
var allEnemies = [];

function pushEnemies () {
    var enemy = new Enemy(-80,(80 + (Math.floor((Math.random() * 3)) * 80) )) 
    allEnemies.push(enemy);
    
    if(allEnemies[0].x >= 600) {
        allEnemies.shift();
    };
}
function checkCollisions() {
    for(var i=0; i<allEnemies.length; i++)
    {
        if (player.x < allEnemies[i].x + allEnemies[i].width 
        && player.x + player.width  > allEnemies[i].x 
        && (player.y - allEnemies[i].y) < 10 
        && (player.y - allEnemies[i].y) >= -10)
        {
            reset();
        }
    }
}
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
