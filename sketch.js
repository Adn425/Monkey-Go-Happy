

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var ground;

var survivalTime = 0;


function preload(){
  monkey_running =         loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(400,350);
  
  monkey = createSprite(50,275,20,50);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,325,400,50);
  ground.x = ground.width /2;
  ground.shapeColor = "green";
  
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
  
  survivalTime = 0;
  
}

function draw() {
  
  background("lightblue");
  
    ground.velocityX = -4;
    survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
    stroke("black");
    textSize(20);
    fill("black");
    text("Survival Time: "+ survivalTime, 125,100);
    
    if (ground.x < 200) {
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 200) {
      monkey.velocityY = -12;
    }

  monkey.velocityY = monkey.velocityY + 0.8
    
  monkey.collide(ground);
  
  spawnObstacles();
  
  spawnBananas();
  
  drawSprites();
}


function spawnObstacles() {
  if (World.frameCount % 100 === 0){
    var obstacle = createSprite(400,282,10,40);
    obstacle.velocityX = -(4 + survivalTime/100);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstacle.scale = 0.1;
    
    obstaclesGroup.add(obstacle);
 }
}
function spawnBananas() {
  if(World.frameCount % 80 === 0) { 
    banana = createSprite(400,200,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    
    banana.y = Math.round(random(150,200));
    
    banana.setLifetime = 50;
    
    bananaGroup.add(banana);
  }
}
