export class Game {
  static countOfCorrectClicks = 0;
  static choosenField = null;

  static incrementNumberOfCorrectClicks() {
    Game.countOfCorrectClicks++;
  }

  static resetNumberOfCorrectClicks() {
    Game.countOfCorrectClicks = 0;
  }

  static setChoosenField(piece) {
    Game.choosenField = piece;
  }
}
