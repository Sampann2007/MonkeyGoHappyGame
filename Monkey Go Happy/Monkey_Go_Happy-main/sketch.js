var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var bananaImg;
var FoodGroup,obstaclesGroup;
var score;
var obstaclesImg;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg=loadImage("banana.png");
  obstaclesImg=loadImage("stone.png");
  

}

function setup() {
  createCanvas(800,400);
  
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  FoodGroup=new Group();
  obstaclesGroup=new Group();
  score=0;
  
}

function draw() { 
  background(0);
  drawSprites();
  spawnFood();
  obstacles();
 

  if(gameState===PLAY){
    fill("black")
    text("score: " + score,400,200)
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score=score+2
      player.scale+=+0.1;
    }
    if(obstaclesGroup.isTouching(player)){
      gameState=END;
    } 
  } else if(gameState===END){
    backgr.velocityX=0;
    player.visible=false;
    FoodGroup.destroyEach();
    obstaclesGroup.destroyEach();
    textSize(30);
    fill(255);
    text("GAME OVER!",300,220);

  }
 

  
}
function spawnFood(){
  if(frameCount%80===0){
    var banana=createSprite(600,450,40,10);
    banana.y=random(120,200);
    banana.addImage(bananaImg)
    banana.scale=0.05;
    banana.velocityX=-4;
    banana.lifetime=300;
    player.depth=banana.depth+1;
    FoodGroup.add(banana);
  }
}
function obstacles(){
  if(frameCount%300===0){
    var obstacles=createSprite(600,340,30,30);
    obstacles.addImage(obstaclesImg);
    obstacles.velocityX=-2;
    obstacles.lifetime=400;
    obstacles.scale=0.2
    obstaclesGroup.add(obstacles);
  }
}