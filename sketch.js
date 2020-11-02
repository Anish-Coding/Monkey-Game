var END = 0;
var PLAY = 1;
var gameState= 1;
var ground;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var gameOver, gameOverImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImage = loadImage("Game_Over.jpg")
}



function setup() {
  createCanvas(600,600);
  monkey = createSprite(60,440,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.15;
  
  ground = createSprite(300,495,1200,20);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  gameOver = createSprite(300,250,30,30);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.scale = 1.5;
  gameOver.visible = false;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() {
  //Clears the canvas
  background("white");
  
  if(gameState === PLAY){
    if(ground.x < 0){
      ground.x = ground.width/2;
    }

    //If the key space is pressed then monkey jumps
    if(keyDown("space")){
      monkey.velocityY = -15;
    }

    //Adding gravity
    monkey.velocityY = monkey.velocityY+0.8;

    //Preventing from falling
    monkey.collide(ground);

    //If monkey is eating the banana then banana will be destroyed.
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    }
    
  stroke("white");
  textSize(20);
  fill("white");
  text("score :" + score,200,100);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("SurvivalTime :"+survivalTime, 100, 50);
  
  food(); 
  obstacles();
  
  } else if (gameState == END){
    monkey.destroy();
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.destroyEach();
    FoodGroup.setVelocityXEach(0);
    FoodGroup.destroyEach();
    ground.destroy(); 
    gameOver.visible = true;
  }
    
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
  
  drawSprites();  
}

function food(){
  if(frameCount%80 == 0){
    banana = createSprite(500,Math.round(random(120,200)),20,20);
    banana.addImage("banana",bananaImage);
    banana.velocityX = -5;
    banana.scale = 0.1;
    banana.lifeTime = -120;
    FoodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount%300 == 0){
    obstacle = createSprite(570,455,30,30);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.velocityX = -5;
    obstacle.scale = 0.2;
    obstacle.lifeTime = -120;
    //obstacle.debug = true;
    obstacle.setCollider("circle",-10,0,250);
    obstacleGroup.add(obstacle);
  }
}