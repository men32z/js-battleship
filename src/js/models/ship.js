import Position from './position';

export default class Ship {
  constructor(id) {
    this.positions = [];
    this.id = id;
  }

  get length() {
    return this.positions.length;
  }

  hit(id) {
    this.positions.forEach((item) => {
      if (item.id === id) item.hited = true;
    });
  }

  hitXY(x, y) {
    this.positions.forEach((item) => {
      if (item.x === x && item.y === y) item.hited = true;
    });
  }

  isSunk() {
    if (this.positions.length === 0) return false;
    return this.positions.every(x => x.hited);
  }

  addPosition(position) {
    this.positions.push(new Position(position));
  }
}
