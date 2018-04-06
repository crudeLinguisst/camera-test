class Mover {
  constructor(tx, ty){
    const arrW = [random(-200), random(width, width+200)];
    const arrH = [random(-200), random(height, height+200)];
    this.target = createVector(tx,ty);
    this.pos = createVector(random(arrW), random(arrH));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.size = vScale;
    this.alpha = 255;

    this.maxSpeed = 15;
    this.maxForce = .5;
    this.isOut = false;
    this.fleeTargetX = random(arrW);
    this.fleeTargetY = random(arrH);

    this.ang = random(0, 360);

    // Init Colors
    this.r = random(252);
    this.g = random(100);
    this.b = random(250);
  }

  expand(){
    angleMode(DEGREES);
    let inc = map(sin(this.ang), -1, 1, vScale*.8, vScale);
    this.size = inc;
    this.ang+= 10
  }

  moveTo(x, y){
    this.target.x = x;
    this.target.y = y;
    this.alpha+= 10;
    this.alpha = constrain(this.alpha, 0, 255);
  }

  getColor(r, g, b){
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

Mover.prototype.update = function() {
  this.vel.add(this.acc);
  this.pos.add(this.vel);
  this.acc.mult(0);
}

Mover.prototype.summon = function() {
  noStroke();
  ellipse(this.pos.x, this.pos.y, this.size*1.4, this.size*1.4);
  // this.expand();
  // Color
  fill(this.r, this.g, this.b, this.alpha);
}

Mover.prototype.seek = function(target){
  let desire = p5.Vector.sub(target, this.pos);
  desire.setMag(this.maxSpeed);
  let steering = p5.Vector.sub(desire, this.vel);
  steering.limit(this.maxForce)
  return steering;
  // console.log(this.vel)
}

Mover.prototype.arrive = function(target){
  let desire = p5.Vector.sub(target, this.pos);
  let dist = desire.mag();
  let speed = this.maxSpeed;
  if(dist < 200){
    speed = map(dist, 200, 0, this.maxSpeed, 0)
    desire.setMag(speed);
  } else {
    desire.setMag(speed);
  }
  let steering = p5.Vector.sub(desire, this.vel);
  steering.limit(this.maxForce)
  return steering;
}


Mover.prototype.applyBehavior = function(){
  let arrive = this.arrive(this.target);
  this.applyForce(arrive);
}

Mover.prototype.applyForce = function(f){
  this.acc.add(f);
}

Mover.prototype.flee = function() {
  // const arrW = [random(-200), random(width, width+200)];
  // const arrH = [random(-200), random(height, height+200)];
  this.target.x = this.fleeTargetX;
  this.target.y = this.fleeTargetY;
  this.alpha -= 10;
  if(this.alpha <= 0){
    this.isOut = !this.isOut;
  }
}
