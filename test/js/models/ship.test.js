import Ship from '../../../src/js/models/ship';
import Position from '../../../src/js/models/position';

test('add position and length', () => {
  let ship = new Ship();
  expect(ship.length).toBe(0);
  ship.addPosition(new Position(3));
  expect(ship.length).toBe(1);
});

test('marks position as hited', () => {
  let ship = new Ship();
  ship.addPosition(new Position(3));
  expect(ship.positions[0].hited).not.toBeTruthy();
  ship.hit(3);
  expect(ship.positions[0].hited).toBeTruthy();
});

test('return true if a ship is sunked', () => {
  let ship = new Ship();
  ship.addPosition(new Position(3));
  ship.addPosition(new Position(4));
  expect(ship.isSunk()).not.toBeTruthy();
  ship.hit(3);
  expect(ship.isSunk()).not.toBeTruthy();
  ship.hit(4);
  expect(ship.isSunk()).toBeTruthy();
});