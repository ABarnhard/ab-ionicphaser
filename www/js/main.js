var game = new Phaser.Game(300, 320, Phaser.CANVAS, '', {preload:preload, create:create, update:update});

function preload(){
  'use strict';
  game.load.tilemap('map', 'assets/ionicphaser.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('mario', 'assets/super_mario.png');
}

var map, background, clouds, ground;

function create(){
  'use strict';
  game.physics.startSystem(Phaser.Physics.ARCADE);

  map = game.add.tilemap('map');
  map.addTilesetImage('Mario', 'mario');

  background = map.createLayer('Background');
  clouds = map.createLayer('Clouds');
  ground = map.createLayer('Ground');

  background.resizeWorld();
  

}

function update(){
  'use strict';
}
