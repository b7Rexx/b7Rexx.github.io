function AntSmasher(appElement, defineAnts, ants) {
  var that = this;
  var restartBtn = undefined;
  this.antBoxes = [];
  this.antcount = ants || 5;
  this.defineAnts = defineAnts || [];
  this.antSmashInterval = undefined;
  this.antSmashInstance = null;
  this.appElement = appElement;

  this.initialize = function () {
    that.antSmashInstance = new Game(this.appElement, this.antcount);
    that.antSmashInstance.init(this.defineAnts);
    that.antBoxes = that.antSmashInstance.getBoxes();
    that.antBoxes.forEach(function (value) {
      value.changeBoxToAnt();
    });
    that.antSmashInstance.initAntScore();
    that.antSmashInstance.scoreElement.innerHTML = '<h3>Ant Score</h3><hr>' + that.antBoxes.length + ' ants alive<br>';
    restartBtn = document.createElement('a');
    gameInterval();
    restartBtn.addEventListener('click', function () {
      //reset ant smasher
      that.antSmashInstance.element.removeChild(restartBtn);
      resetGame();
      gameInterval()
    });
  };

  function gameInterval() {
    that.antSmashInterval = setInterval(function () {
      if (that.antBoxes.length === 0) {
        restartBtn.innerHTML = 'Congratulation! ants smash complete<br>Click to reset ants';
        restartBtn.classList.add('reset-btn');
        that.antSmashInstance.element.append(restartBtn);
        clearInterval(that.antSmashInterval);
      }
    }, 100);
  }

  function resetGame() {
    that.antSmashInstance.startGameAddBoxes();
    that.antBoxes = that.antSmashInstance.getBoxes();
    that.antBoxes.forEach(function (value) {
      value.changeBoxToAnt();
    });
    that.antSmashInstance.moveBoxes();
    // that.antSmashInstance.initAntScore();
    that.antSmashInstance.scoreElement.innerHTML = '<h3>Ant Score</h3><hr>' + that.antBoxes.length + ' ants alive<br>';

  }
}
