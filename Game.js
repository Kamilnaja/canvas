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
  addToPath(path) {
    this.paths.push(path);
  },
  resetPaths() {
    this.paths = [];
  },
  logPath() {
    for (let i = 0; i < this.paths.length; i++) {
      console.log(this.paths[i]);
    }
  },
};
