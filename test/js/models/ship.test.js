import Ship from '../../../src/js/models/ship';

test('add position and length', () => {
  const ship = new Ship();
  expect(ship.length).toBe(0);
  ship.addPosition(3);
  expect(ship.length).toBe(1);
});

test('marks position as hited', () => {
  const ship = new Ship();
  ship.addPosition(3);
  expect(ship.positions[0].hited).not.toBeTruthy();
  ship.hit(3);
  expect(ship.positions[0].hited).toBeTruthy();
});

test('return true if a ship is sunked', () => {
  const ship = new Ship();
  ship.addPosition(3);
  ship.addPosition(4);
  expect(ship.isSunk()).not.toBeTruthy();
  ship.hit(3);
  expect(ship.isSunk()).not.toBeTruthy();
  ship.hit(4);
  expect(ship.isSunk()).toBeTruthy();
});