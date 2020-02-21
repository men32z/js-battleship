import Gameboard from '../../../src/js/models/gameboard';


test('Place ship position', () => {
  const gameboard = new Gameboard();
  gameboard.fillGrid();
  expect(gameboard.ships.length).toBe(0);
  gameboard.placeShip([1, 3], [4, 3]);
  expect(gameboard.ships.length).toBe(1);
  expect(gameboard.ships[0].positions.some(x => x.id === 23)).toBeTruthy();
  gameboard.placeShip([3, 1], [3, 4]);
  expect(gameboard.ships.length).toBe(2);
  expect(gameboard.ships[1].positions.some(x => x.id === 32)).toBeTruthy();
});

test('Receive atack', () => {
  const gameboard = new Gameboard();
  gameboard.fillGrid();
  gameboard.placeShip([1, 3], [4, 3]);
  gameboard.receiveAttack(4, 3);
  expect(gameboard.ships[0].positions.find(x => x.id === 43).hited).toBeTruthy();
  expect(gameboard.grid[43].hited).toBeTruthy();
});

test('All ships sunk', () => {
  const gameboard = new Gameboard();
  gameboard.fillGrid();
  expect(gameboard.allSunk()).not.toBeTruthy();
  gameboard.placeShip([1, 3], [1, 3]);
  expect(gameboard.allSunk()).not.toBeTruthy();
  gameboard.receiveAttack(1, 3);
  expect(gameboard.grid[13].hited).toBeTruthy();
  expect(gameboard.allSunk()).toBeTruthy();
});
