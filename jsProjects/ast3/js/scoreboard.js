function ScoreBoard(gameElement) {
  this.scoreElement = undefined;

  /*
initialize scoreboard with default config
 @return this
 */
  this.initAntScore = function () {
    var board = document.createElement('div');
    board.classList.add('scoreboard');
    gameElement.appendChild(board);
    this.scoreElement = board;
  };
}
