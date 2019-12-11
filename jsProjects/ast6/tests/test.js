let element = undefined;
element = document.createElement('canvas');
element.classList.add('bird');
element.height = 100;
element.width = 100;

let parent = document.getElementById('app');
parent.appendChild(element);

let birdSprite = new Image();
birdSprite.src = 'test.png';
let frameCount = 3;

let _canvasSprite = new CanvasSprite(element.getContext("2d"), 100, frameCount * 100, birdSprite);
_canvasSprite.canvasOptions(10, frameCount, 'infinite');

// parent.appendChild(birdSprite);

birdSpriteLoop();

function birdSpriteLoop() {
  window.requestAnimationFrame(birdSpriteLoop);
  _canvasSprite.update();
  _canvasSprite.render();
}
