import Player from '../../../src/js/models/player';
import Gameboard from '../../../src/js/models/gameboard';


test('get AI Attack position', () => {
  const gameboard = new Gameboard();
  gameboard.fillGrid();
  gameboard.placeShip([1, 3], [4, 3]);
  gameboard.placeShip([6, 1], [6, 4]);

  const player = new Player(gameboard);
  const attack = player.getAiAttack(false);
  expect(attack).toBeGreaterThanOrEqual(1);
  expect(attack).toBeLessThan(100);
  player.gameboard.grid.forEach((item) => {
    item.hited = true;
  });
  player.gameboard.grid[1].hited = false;
  player.gameboard.grid[2].hited = false;
  const attack2 = player.getAiAttack(false);
  expect(attack2).toBeGreaterThanOrEqual(1);
  expect(attack2).toBeLessThan(3);
});

test('get AI smarter Attack position', () => {
  const gameboard = new Gameboard();
  gameboard.fillGrid();
  gameboard.placeShip([1, 3], [4, 3]);
  gameboard.placeShip([6, 1], [6, 4]);

  const player = new Player(gameboard);
  // send the previous attack
  const attack = player.getAiAttack(15);
  expect([14, 16, 5, 25].includes(attack)).toBeTruthy();
});
