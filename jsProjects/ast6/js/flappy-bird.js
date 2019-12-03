class FlappyBird {
  //
  //extend scoreboard
  //
  constructor(parentElement, gameKey) {
    this.score = undefined;
    this._parentElement = parentElement;
    this.gameKey = gameKey;

    this.init();
  }

  init() {
    this.score = new Scoreboard(this._parentElement);
    new Game(this._parentElement, this.score, this.gameKey);
  }
}