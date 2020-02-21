import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.ships = [];
    this.grid = new Array(101).fill(null);
    this.counter = 1;
  }

  fillGrid() {
    this.grid.forEach((item, i) => {
      this.grid[i] = { hited: false, ship: null, sunk: false };
    });
  }

  getShip(id) {
    let ship = false;
    this.ships.forEach((item) => {
      if (item.positions.find(x => x.id === id)) {
        ship = item;
      }
    });
    return ship || false;
  }

  sunkShip(ship) {
    this.grid.forEach((i) => {
      if (i.ship === ship.id) i.sunk = true;
    });
  }

  placeShip(sta, end) {
    const start = [...sta];
    const ship = new Ship(this.counter += 1);
    const z = start[0] === end[0] ? 1 : 0;
    while (start[z] <= end[z]) {
      const position = (start[z === 0 ? z : 0] * 10) + start[z === 1 ? z : 1];
      ship.addPosition(position);
      this.grid[position].ship = ship.id;
      start[z] += 1;
    }
    this.ships.push(ship);
  }

  receiveAttack(x, y) {
    const pid = (x * 10) + y;

    this.grid[pid].hited = true;
    if (this.grid[pid].ship) {
      this.ships.find(i => i.id === this.grid[pid].ship).hit(pid);
      return true;
    }
    return false;
  }

  validAttack(x, y) {
    const pid = (x * 10) + y;
    return !this.grid[pid].hited;
  }

  allSunk() {
    if (this.ships.length === 0) return false;
    return this.ships.every(ship => ship.isSunk());
  }
}
