function Grid(){
  var output = [];
  var $y = document.querySelectorAll('.y');
  for(var i = 0; i < $y.length; i++){
    output.push($y[i].querySelectorAll('.x'));
  }
  return output;
}
var $grid = Grid();
var nextID = 0;
function Car(sprite,x,y){
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
  $grid[this.y][this.x].appendChild(this.$element);
}
Car.prototype.update = function(){
  $grid[this.y][this.x].appendChild(this.$element);
};


myCar = new Car('images/f1.svg',0,0);
