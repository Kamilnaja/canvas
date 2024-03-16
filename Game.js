export const game = {
  countOfCorrectClicks: 0,
  choosenField: null,

  incrementNumberOfCorrectClicks() {
    this.countOfCorrectClicks++;
  },
  resetNumberOfCorrectClicks() {
    this.countOfCorrectClicks = 0;
  },
  setChoosenField(piece) {
    this.choosenField = piece;
  },
};
