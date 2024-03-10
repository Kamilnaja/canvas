export const game = {
  countOfCorrectClicks: 0,
  choosenField: null,
  paths: [],

  incrementNumberOfCorrectClicks() {
    this.countOfCorrectClicks++;
  },
  resetNumberOfCorrectClicks() {
    this.countOfCorrectClicks = 0;
  },
  setChoosenField(piece) {
    this.choosenField = piece;
  },
  setPath(path) {
    this.paths = path;
  },
  cleanPath() {
    this.paths = [];
  },
  logPath() {
    console.log(this.paths.flat());
  },
};
