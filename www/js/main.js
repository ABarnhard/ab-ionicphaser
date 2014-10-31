var screenWidth = window.innerWidth,
    screenHeight = window.innerHeight;

var game = new Phaser.Game(screenWidth, 300, Phaser.CANVAS, '', {preload:preload, create:create, update:update});

function preload(){
  'use strict';
  game.load.tilemap('map', 'assets/ionicphaser.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('mario', 'assets/super_mario.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.spritesheet('coin', 'assets/coin.png', 32, 32);

  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;

  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  game.scale.refresh();
}

var map, background, clouds, ground, dude, floor, money;

function create(){
  'use strict';
  game.physics.startSystem(Phaser.Physics.ARCADE);

  map = game.add.tilemap('map');
  map.addTilesetImage('Mario', 'mario');

  background = map.createLayer('Background');
  clouds = map.createLayer('Clouds');
  ground = map.createLayer('Ground');
  floor = map.createLayer('Floor');

  background.resizeWorld();

  map.setCollision(34, true, 'Floor');

  money = game.add.group();
  money.enableBody = true;
  money.physicsBodyType = Phaser.Physics.ARCADE;
  // args = Layer to pull, gid of object, name of sprite asset, frame on spritesheet, ???, ???, name of group
  map.createFromObjects('Coins', 45, 'coin', 0, true, false, money);

  money.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
  money.callAll('animations.play', 'animations', 'spin');

  dude = game.add.sprite(15, 15, 'dude');
  dude.animations.add('left', [0, 1, 2, 3], 10, true);
  dude.animations.add('right', [5, 6, 7, 8], 10, true);
  game.physics.arcade.enable(dude);
  dude.body.collideWorldBounds = true;
  // dude.body.gravity.x = 3000;
  game.camera.follow(dude);

}

function update(){
  'use strict';
  dude.body.velocity.x = dude.body.velocity.y = 0;
  game.physics.arcade.collide(dude, floor);

  if(game.input.activePointer.isDown){
    if(game.input.activePointer.x < Math.floor(screenWidth/2)){
      dude.body.velocity.x = -150;
      dude.animations.play('left');
    }else{
      dude.body.velocity.x = 150;
      dude.animations.play('right');
    }
    if(game.input.activePointer.y < Math.floor(300/2)){
      dude.body.velocity.y = -150;
    }else{
      dude.body.velocity.y = 150;
    }
  }else{
    dude.animations.stop();
    dude.frame = 4;
  }
}
