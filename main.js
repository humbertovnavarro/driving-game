var $container = document.querySelector('.container');
var nextID = 0;
window.addEventListener('keydown',gameLoop);
function Car(sprite, x = 0, y = 0){
  this.direction = 0;
  this.topSpeed = 5;
  this.speed = 0.2;
  this.accel = 0.1;
  this.moving = 1;
  this.turnSpeed = 5;
  this.$element = document.createElement('div');
  this.$element.setAttribute('data-id', nextID);
  nextID++;
  this.$element.className = 'car';
  this.$sprite = document.createElement('img');
  this.$sprite.src = sprite;
  this.$element.appendChild(this.$sprite);
  this.sprite = sprite;
  this.x = x;
  this.y = y;
  $container.appendChild(this.$element);
  this.$sprite.style.transform = rotationString(0);
  gameObjects.push(this);
}

function rotationString(number){
  return 'rotate(' + number + 'deg' + ')';
}

Car.prototype.update = function(){
  this.$sprite.style.left = this.x;
  this.$sprite.style.top = this.y;
  this.$sprite.style.transform = rotationString(this.direction);
  this.$element.style.top = this.y + 'px';
  this.$element.style.left = this.x + 'px';
  this.x += this.speed * Math.cos(this.direction * Math.PI / 180);
  this.y += this.speed * Math.sin(this.direction * Math.PI / 180);
  if(player.moving === 1){
    this.speed += this.accel;
  } else if(player.moving === -1){
    this.speed -= this.accel;
  }
  if(this.speed > 0){
    this.speed -= 0.01;
  }
  if(this.speed <= 1){
    this.turnSpeed -= 0.01;
  }
  if(this.speed > this.topSpeed){
    this.speed = this.topSpeed;
  }
  if(this.x > window.innerWidth){
    this.x = 10;
  }
  if(this.x < 0){
    this.x = window.innerWidth;
  }
  if(this.y > window.innerHeight){
    this.y = 0;
  }
  if(this.y < 0){
    this.y = window.innerHeight;
  }
};

var gameObjects = [];

var player = new Car('images/f1.svg');

setInterval(gameLoop, 16);

function gameLoop(event){
  console.log('Event', event);
  if(event instanceof KeyboardEvent) {
    if(event.key === 'w'){
      player.moving = 1;
    }
    if(event.key === 's'){
      player.moving = -1;
    }
    if(event.key === 'd') {
      player.direction += player.turnSpeed;
    }
    if(event.key === 'a'){
      player.direction -= player.turnSpeed;
    }
    if(player.direction >= 360){
        player.direction = 0;
    }
    if(player.direction < 0){
        player.direction = 360;
    }
  }else {
    for(var i = 0; i < gameObjects.length; i++) {
      gameObjects[i].update();
    }
  }
}
