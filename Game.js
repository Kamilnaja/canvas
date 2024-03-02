export class Game {
  static countOfCorrectClicks = 0;

  static incrementNumberOfCorrectClicks() {
    Game.countOfCorrectClicks++;
  }

  static resetNumberOfCorrectClicks() {
    Game.countOfCorrectClicks = 0;
  }
}
