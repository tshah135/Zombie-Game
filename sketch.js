var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var score = 0;
var life = 3;
var bullets = 70, bullet;

var eb;

var heart1, heart2, heart3

var gameState = "fight";

var lose, winning, explosionSound;


function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")
  ebImg = loadImage("game-over.png")

  lose = loadSound("assets/lose.mp3")
  winning = loadSound("assets/win.mp3")
  explosionSound = loadSound("assets/explosion.mp3")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20, displayHeight/2-40, 20, 20);
  bg.addImage(bgImg);
  bg.scale = 1.1;

  player = createSprite(200, displayHeight - 300, 30, 30);
  player.addImage(shooterImg);
  player.scale = 0.4;
  //player.debug = true; 
  player.setCollider("rectangle", 0, 0, 200, 200);

  heart1 = createSprite(displayWidth-150, 40, 20, 20);
  heart1.addImage(heart1Img);
  heart1.scale = 0.4;

  heart2 = createSprite(displayWidth-100, 40, 20, 20);
  heart2.addImage(heart2Img);
  heart2.scale = 0.4;

  heart3 = createSprite(displayWidth-150, 40, 20, 20);
  heart3.addImage(heart3Img);
  heart3.scale = 0.4;

  bulletGroup = new Group();
  zombieGroup = new Group();
  



}

function draw() {
  background(0); 

  if(life == 3) {
    heart3.visible = true;
    heart1.visible = false;
    heart2.visible = false;
  }

  if(life == 2) {
    heart3.visible = false;
    heart1.visible = false;
    heart2.visible = true;
  }

  if(life == 1) {
    heart3.visible = false;
    heart1.visible = true;
    heart2.visible = false;
  }
  
  if (life == 0) {
    zombieGroup.destroyEach();
    player.destroy();
    //text ("Game Over", 400, 400); 
    eb = createSprite(displayWidth/2-20, displayHeight/2-40, 20, 20);
    eb.addImage(ebImg);
    heart1.visible = false;
  } 

  if(keyDown("UP_ARROW")) {
    player.y -= 30;
  }

  if(keyDown("DOWN_ARROW")) {
    player.y += 30;
  }

  if(keyWentDown("space")) {
    bullet = createSprite(displayWidth-1150, player.y - 30, 50, 10);
    bullet.velocityX = 10;
    bullet.shapeColor = "orange"; 
    bulletGroup.add(bullet); 
    player.addImage(shooter_shooting); 
  }

  if(keyWentUp("space")) {
    player.addImage(shooterImg); 
  }


  if(bulletGroup.isTouching(zombieGroup)) {
    for( var i = 0; i < zombieGroup.length; i++) {
      if(zombieGroup[i].isTouching(bulletGroup)) {
        zombieGroup[i].destroy(); 
        bulletGroup.destroyEach(); 
        score += 1;
      }
    }

  }

  if(zombieGroup.isTouching(player)) {
    for (var i = 0; i < zombieGroup.length; i++) {
      if (zombieGroup[i].isTouching(player)) {
        zombieGroup[i].destroy();
        life -= 1; 
        if (life == 0) { 
          bg.visible = false;
          zombie.visible = false;
          text("Game Over!", 200, 200);
        }
      }
    }
  }
  


  enemy(); 

  drawSprites();

}

function enemy() {
  if (frameCount % 70 == 0) {
    zombie = createSprite(random(500, 1000), random(50, 500), 40, 40);
    zombie.addImage(zombieImg);
    zombie.velocityX = -4;
    zombie.scale = 0.25;
    zombieGroup.add(zombie); 
  }
}














