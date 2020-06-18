//y=x diag
//y=(-x)+n where n is the board dimension for anti-diag

function Board(dimension) {
  this.dimension = dimension;
  for (i = 0; i < dimension; i++) {
    this["x" + i] = [];
    for (n = 0; n < dimension; n++) {
      let place = new Place(i, n);
      this["x" + i].push(place);
    }
  }
}

function Place(x, y) {
  this.x = x;
  this.y = y;
}
