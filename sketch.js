  //variables function outside the function are called global                   variables/public variables
  //variables declared inside a function are called local variables/private     variables

  var PLAY = 1
  var END = 0
  var gameState = PLAY;

  var trex;
  var trexImg;
  var edges;
  var groundImg;
  var invisibleGround;
  var cloud;
  var cloudGroup;
  var cloudImg
  var obstacle;
  var obstacleGroup;
  var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
  var score1;
  var trexCollided;
  var restart;
  var restartImg
  var gameOver;
  var gameOverImg;
  var dieSound;
  var jumpSound;
  var checkPointSound;

  //to upload a image and sound.
  function preload(){
    
    trexImg = loadAnimation("trex1.png","trex3.png","trex4.png");
    groundImg = loadAnimation("ground2.png");
    cloudImg = loadAnimation("cloud.png");
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
    obstacle6 = loadImage("obstacle6.png");
    trexCollided = loadAnimation("trex_collided.png")
    restartImg = loadAnimation("restart.png");
    gameOverImg= loadAnimation("gameOver.png");
    dieSound = loadSound("die.mp3");
    jumpSound = loadSound("jump.mp3");
    checkPointSound = loadSound("checkPoint.mp3");

  }

  //for one time code
  function setup(){
    createCanvas(600,200);

    //creating trex
    trex = createSprite(50,160,20,40);
    trex.addAnimation("running", trexImg);
    trex.scale = 0.5;
    
    //creating edges
    edges = createEdgeSprites();
    
    //creating the grounds
    ground = createSprite(200,185,400,20);
    ground.addAnimation("running",groundImg) ;
    
    invisibleGround = createSprite(0,195,300,10);
    invisibleGround.visible = false;  
    
    score1 = 0
    
    cloudGroup = new Group();
    obstacleGroup = new Group();
    
    //trex.debug = true;
    trex.setCollider ("circle",0,0,40);
    
    trex.addAnimation("collided",trexCollided);
    
    restart = createSprite(300,120,10,10);
    restart.addAnimation("restart", restartImg);
    restart.scale = 0.3;
    
    
    gameOver = createSprite(300,80,10,10);
    gameOver.addAnimation("gameOver",gameOverImg);
    gameOver.scale = 1;
    
    
    
  }

  //for logic
  function draw(){
    //console.count("FPS"); //how many times the funtion runs.
    //console.error("yes there is an error");
    //console.info("information");
    //console.warn("stop!!!!")
    
    
    //console.time();//time taken for function draw to work.
     
    background("blue");
    console.log("the gameState is :" + " " + gameState);
    
    if (gameState === PLAY){
    score1 = score1 + Math.round(getFrameRate()/60);
    spawnClouds();
    spawnObstacles();
    //trying to make the trex seem running
    ground.velocityX = -(6 + 2*score1/100);
    //jump when space spacekey is pressed and fixed bug of flappy               bird. 
    if (keyDown("space") && trex.y >= 160){
       
      trex.setVelocity(0,-10);
      jumpSound.play();

    }
      
      restart.visible = false;
      gameOver.visible = false;
      
      
    if (trex.isTouching(obstacleGroup)){
      
       gameState = END
       dieSound.play();
       //trex.setVelocity(0,-10);
      
      
    }
      
      
    if (score1 > 0 && score1%200 === 0){
      
      checkPointSound.play();
      
    }
      
    }
    else if (gameState === END){
      
   ground.velocityX = 0;
   cloudGroup.setVelocityXEach(0);
   obstacleGroup.setVelocityXEach(0);
   trex.velocityX = 0
   trex.changeAnimation("collided",trexCollided);
   obstacleGroup.setLifetimeEach(-1);
   cloudGroup.setLifetimeEach(-1);
   score1 = score1;
   trex.velocityY = 0;
   restart.visible = true;
   gameOver.visible = true;
  
   }
    //looping the ground
    if (ground.x < 0){ 
      ground.x = ground.width/2;

    }
    
    if (mousePressedOver(restart)){
      
      reset();
      
    }
    
    //  gravity
    trex.velocityY = trex.velocityY + 0.8;

    //stopping the trex from falling down
   trex.collide(invisibleGround)
    
   

    drawSprites();
    text("score :" + " " + score1,270,30)
    //console.timeEnd();
    
  }

function spawnClouds(){
  
  
  if (frameCount%70 === 0){
    
    cloud = createSprite(600,60,10,10)
    cloud.velocityX = -6;
    cloud.addAnimation("running",cloudImg)
    cloud.y = Math.round(random(30,60));
    cloud.lifetime = 110// lifetime = distance/velocity = 600/6 = 100
    cloudGroup.add(cloud);
    
  }
  
 
  
}

function spawnObstacles(){
  
 if (frameCount%80 === 0){
 obstacle = createSprite(600,175,10,10);
 obstacle.velocityX = -(6 + 2*score1/100);
 var randomnNo = Math.round(random(1,6));
 switch(randomnNo){
        
        case 1: obstacle.addImage(obstacle1);
        break;
        case 2: obstacle.addImage(obstacle2);
        break;    
        case 3: obstacle.addImage(obstacle3);
        break;    
        case 4: obstacle.addImage(obstacle4);
        break;    
        case 5: obstacle.addImage(obstacle5);
        break;    
        case 6: obstacle.addImage(obstacle6);
        break;
        default : break;
  }  
   obstacle.scale = 0.5
   obstacle.lifetime = 100
   obstacleGroup.add(obstacle);
}
  
}

function reset(){
  
  gameState = PLAY;
  
  cloudGroup.destroyEach();
  
  obstacleGroup.destroyEach();
  
  trex.changeAnimation("running", trexImg)
  
}