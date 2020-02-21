import initialDom from './initialDom';

import Gameboard from './models/gameboard';
import Player from './models/player';
import dom from './dom';
import gameLogic from './gameLogic';

const initialLogic = (() => {
  const grid = new Array(101).fill(null);
  let counter = 0;
  const ships = [];
  let exampleBoard;

  const dragStart = (event) => {
    event.dataTransfer.setData('aid', parseInt(event.target.id.split('-')[1], 10));
    event.dataTransfer.setData('ship-id', parseInt(event.target.dataset.shipid, 10));
  };

  const dropping = (event) => {
    const landing = parseInt(event.target.id.split('-')[1], 10);
    const originId = parseInt(event.dataTransfer.getData('aid'), 10);
    const ship = ships.find(x => x.id === parseInt(event.dataTransfer.getData('ship-id'), 10));
    const dif = landing - originId;

    const shipCal = ship.positions.map(x => {
      const position = x.position + dif;
      return {
        id: x.id, first: x.first, position, startPosition: x.position,
      };
    });

    let flag = true;
    const startEnd = [];
    shipCal.forEach((i) => {
      if (i.position < 1) flag = false;
      if (i.position > 100) flag = false;
      if (grid[i.position]) flag = false;
      const start = i.startPosition - 1 < 10 ? 0 : Math.floor((i.startPosition - 1) / 10);
      const end = i.position - 1 < 10 ? 0 : Math.floor((i.position - 1) / 10);
      startEnd.push([start, end]);
    });

    const pos = Math.floor(ship.positions[0].position / 10);
    if (ship.positions.every(x => Math.floor(x.position / 10) === pos)) {
      if (!startEnd.every(
        x => x[0] === startEnd[0][0] && x[1] === startEnd[0][1],
      )) flag = false;
    }
    if (flag) {
      // clean current postion
      ship.positions.forEach((i) => {
        grid[i.position] = null;
      });
      const modified = [];
      shipCal.forEach((i) => {
        const obj = { id: i.id, first: i.first, position: i.position };
        grid[i.position] = obj;
        modified.push(obj);
      });
      ship.positions = modified;
    }

    initialDom.render(grid, dragStart, dropping);
  };


  const placeShip = (sta, end) => {
    const start = [...sta];
    counter += 1;
    const z = start[0] === end[0] ? 1 : 0;
    let flag = true;

    const ship = { id: counter, positions: [] };
    while (start[z] <= end[z]) {
      const position = (start[z === 0 ? z : 0] * 10) + start[z === 1 ? z : 1];
      const obj = { id: counter, first: flag, position };
      grid[position] = obj;
      ship.positions.push(obj);
      flag = false;
      start[z] += 1;
    }
    ships.push(ship);
  };

  const startGame = () => {
    dom.setController(gameLogic);
    dom.preRender();

    const player = new Player(new Gameboard());
    player.gameboardName = 'first';
    player.gameboard.fillGrid();

    ships.forEach((i) => {
      const idStart = i.positions[0].position;
      const start = [Math.floor(idStart / 10), idStart % 10];

      const idEnd = i.positions[i.positions.length - 1].position;
      const end = [Math.floor(idEnd / 10), idEnd % 10];
      player.gameboard.placeShip(start, end);
    });

    const ai = new Player(new Gameboard(), true);
    ai.gameboardName = 'second';
    ai.gameboard.fillGrid();

    exampleBoard.forEach((item) => {
      ai.gameboard.placeShip(item[0], item[1]);
    });

    dom.render(ai);
    dom.render(player, true);

    gameLogic.setUp(dom, player, ai);
  };

  const setUp = (arr) => {
    exampleBoard = arr;
    initialDom.preRender(startGame);
    arr.forEach((item) => {
      placeShip(item[0], item[1]);
    });
    initialDom.render(grid, dragStart, dropping);
  };
  return { setUp };
})();
export default initialLogic;
