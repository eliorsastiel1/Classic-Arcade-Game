

// Enemies our player must avoid
var Enemy = function(locX, locY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=locX;
    this.y=locY;
    this.startX=locX;
    this.startY=locY;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    
    for(var i=0; i<allEnemies.length; i++){
        allEnemies[i].speed=150;
    }
    this.x = this.x+(this.speed*dt);

    if( player.x >= this.x -40 && player.x <=this.x + 40 ){
        if( player.y >= this.y -40 && player.y <=  this.y+40 ){
            player.x = 200;
            player.y = 400;
            score=0;
            document.getElementById("score").innerHTML = score;
        }
    }

    if(this.x>600){
        this.reset();
    }
};

Enemy.prototype.reset = function(){
    this.x = this.startX;
    this.y = this.startY;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(locX, locY) {

    this.sprite = 'images/char-boy.png';
    this.x=locX;
    this.y=locY;

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {
    
};


Player.prototype.handleInput = function(e){
    if( e === 'left' && this.x > 0 )  
        this.x = this.x - 20;
    else if( e === 'right' && this.x < 400)
        this.x = this.x + 20;
    else if( e === 'up' && this.y > -50)
        this.y = this.y - 20;
    else if( e === 'down' && this.y < 400)
        this.y = this.y + 20;

    if(this.y < 20 ) {
        this.x = 200;
        this.y = 300;
        score++;
        document.getElementById("score").innerHTML = score;
        if(score>high_score){
            high_score=score;
            document.getElementById("high-score").innerHTML = high_score;
        }
    }
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var allEnemies = [new Enemy(-200,220),new Enemy(-110,140), new Enemy(-160,60), new Enemy(-400,60),new Enemy(-550,220),new Enemy(-260,140), new Enemy(-500,60), new Enemy(-250,60)]; 
var player =new Player(200,300);
var score=0;
var high_score=0;