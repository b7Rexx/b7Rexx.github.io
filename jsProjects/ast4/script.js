var app = document.getElementById('app-wrapper');
if (app) {
  var boxObject = [
    {posX: 10, posY: 10, height: 15, width: 45, color: 'blue', speed: 25},
    {posX: 10, posY: 10, height: 15, width: 45, color: 'blue', speed: 5},
    {posX: 10, posY: 10, height: 15, width: 45, color: 'blue', speed: 50},
    {posX: 10, posY: 10, height: 50, width: 30,color: 'green', speed: 1},
    {posX: 10, posY: 10, height: 30, width: 50,color: 'green', speed: 50},
    {posX: 10, posY: 10, height: 15, width: 100,color: 'green', speed: 100},
    {posX: 10, posY: 10, height: 20, width: 80,color: 'black', speed: 100},
    {posX: 10, posY: 10, height: 40, width: 40,color: 'black', speed: 100},
    {posX: 10, posY: 10, height: 25, width: 64,color: 'black', speed: 100}
  ];
  var boxCollision = new Game(app, 12);
  boxCollision.height = 600;
  boxCollision.width = 600;
  boxCollision.init(boxObject);

  var customAnts = [
    {posX: 10, posY: 10, height: 40, width: 40, speed: 15},
    {posX: 10, posY: 10, height: 40, width: 40, speed: 15},
    {posX: 10, posY: 10, height: 40, width: 40, speed: 15},
    {posX: 10, posY: 10, height: 40, width: 40, speed: 15},
    {posX: 10, posY: 10, height: 40, width: 40, speed: 15},
    {posX: 10, posY: 10, height: 40, width: 40, speed: 15}
  ];

  new AntSmasher(app, customAnts, 5).initialize();
}

var appStress = document.getElementById('app-wrapper-stress');
if (appStress) {
  var appStressCollision = new Game(appStress, 1000);
  appStressCollision.height = 2000;
  appStressCollision.width = 2000;
  appStressCollision.init();
}
