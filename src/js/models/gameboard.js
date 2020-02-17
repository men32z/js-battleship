import Ship from './ship';
import { ConsoleWriter } from 'istanbul-lib-report';

export default class Gameboard {
    constructor() {
        this.ships = [];
        this.grid = new Array(100).fill(null);
      }

    placeShip(start, end) {
        let ship = new Ship();
        let z = start[0] === end[0] ? 1 : 0;
        while(start[z] <= end[z]){
            ship.addPosition((start[z === 0 ? z : 0] * 10) + start[z === 1 ? z : 1]);
            start[z] += 1; 
        }
        this.ships.push(ship);
        
    }  
}

