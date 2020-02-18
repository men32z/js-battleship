import Ship from '../../../src/js/models/ship';
import Position from '../../../src/js/models/position';
import Gameboard from '../../../src/js/models/gameboard';


test('Place ship position', () => {
    let gameboard = new Gameboard();
    expect(gameboard.ships.length).toBe(0);
    gameboard.placeShip([1,3], [4,3])
    expect(gameboard.ships.length).toBe(1);
    expect(gameboard.ships[0].positions.some(x => x.id === 23)).toBeTruthy();
    gameboard.placeShip([3,1], [3,4])
    expect(gameboard.ships.length).toBe(2);
    expect(gameboard.ships[1].positions.some(x => x.id === 32)).toBeTruthy();
  });

  test('Receive atack', () => {
      let gameboard = new Gameboard();
      gameboard.placeShip([1,3], [4,3]);
      gameboard.receiveAttack(4, 3);
      expect(gameboard.ships[0].positions.find(x => x.id === 43).hited).toBeTruthy();
      expect(gameboard.grid[43]).toBe("x");
    });
