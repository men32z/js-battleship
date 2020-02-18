import Ship from './ship';

export default class Gameboard {
    constructor() {
        this.ships = [];
        this.grid = new Array(101).fill(null);
        this.counter = 1;
      }

    placeShip(start, end) {
        let ship = new Ship(this.counter += 1);
        let z = start[0] === end[0] ? 1 : 0;
        while(start[z] <= end[z]){
            let position = (start[z === 0 ? z : 0] * 10) + start[z === 1 ? z : 1] + 1;
            ship.addPosition(position);
            this.grid[position] = ship.id;
            start[z] += 1;
        }
        this.ships.push(ship);
    }

    receiveAttack(x, y){
      let pid = (x * 10) + y
      if (this.grid[pid] !== "X"){
        if (this.grid[pid]) {
          this.ships.find(i => i.id === this.grid[pid]).hit(pid);
        }
        this.grid[pid] = "X";
        return true;
      }else{
        return false;
      }
    }

    allSunk(){
      if (this.ships.length === 0) return false;
      return this.ships.every(ship => ship.isSunk());
    }
}
