import Player from '../../../src/js/models/player';
import Gameboard from '../../../src/js/models/gameboard';


test('get AI Attack position', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([1, 3], [4, 3]);
  gameboard.placeShip([6, 1], [6, 4]);

  const player = new Player(gameboard);
  const attack = player.getAiAttack(false);
  expect(attack).toBeGreaterThanOrEqual(1);
  expect(attack).toBeLessThan(100);
  // faking attacked grid
  player.gameboard.grid = new Array(101).fill('X');
  player.gameboard.grid[1] = null;
  player.gameboard.grid[2] = null;
  const attack2 = player.getAiAttack(false);
  expect(attack2).toBeGreaterThanOrEqual(1);
  expect(attack2).toBeLessThan(3);
});

test('get AI smarter Attack position', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([1, 3], [4, 3]);
  gameboard.placeShip([6, 1], [6, 4]);

  const player = new Player(gameboard);
  // send the previous attack
  const attack = player.getAiAttack(15);
  expect([14, 16, 5, 25].includes(attack)).toBeTruthy();
});
