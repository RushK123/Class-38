class Game {
  constructor() {}
  
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }



  
  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];

    fuelgroup = new Group ();
    coingroup = new Group ();

    this.addSprites(fuelgroup,fuelcan,4, 0.02);
    this.addSprites(coingroup, goldcoin,4,0.09);
    


  
  }

  addSprites(spritegroup, spriteImg, numsprites, scale ){
    for (var i=0; i<numsprites; i++){
      var x,y;
      x = Math.round(random(width/2+150, width/2-150));
      y = Math.round(random(-height*4.5, height-400));
      var sprite = createSprite (x,y);
      sprite.addImage("spritepic",spriteImg);
      sprite.scale = scale;
      spritegroup.add(sprite);
    }



  }
  
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  //SA
  play() {
    this.handleElements();
    Player.getPlayersInfo();
    if (allPlayers!=undefined){
      image(track,0, height*5, width, height*6);
      var index = 0;
      for (var p in allPlayers){
        index += 1;
        var x = allPlayers[p].positionX;
        var y = height-allPlayers[p].positionY;
        cars[index-1].position.x = x;
        cars[index-1].position.y = y; 
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,50);
          camera.position.x = cars[index-1].position.x
          camera.position.y = cars[index-1].position.y
          this.removefuel();
          this.removeCoin();
        }
      
      }

      if(keyDown(UP_ARROW)){
        player.positionY += 10;
        player.update();
      }      
      drawSprites();
    }
    
  }

  removefuel(index) {
    cars[index-1].overlap(fuelgroup, function(collector, collected){
      collected.remove()
    });

    
    

  }

  removeCoin(index){
    cars[index-1].overlap(coingroup, function(collector, collected){
      collected.remove()
    });
  }
}
