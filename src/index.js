import Gameboard from './js/models/gameboard';
import Player from './js/models/player';
import dom from './js/dom';
import gameLogic from './js/gameLogic';


dom.setController(gameLogic);
dom.preRender();

let exampleBoard = [
  [[1,2], [1,2]],
  [[0,8], [0,8]],
  [[8,2], [8,2]],
  [[8,8], [8,8]],

  [[5,2], [6,2]],
  [[4,4], [4,5]],

  [[3,1], [3,3]],
  [[2,4], [2,6]],
  [[2,9], [4,9]],

  [[6,4], [6,8]],
];

let player = new Player(new Gameboard);
player.gameboardName = 'first';

exampleBoard.forEach((item) => {
  player.gameboard.placeShip(item[0], item[1]);
});

let ai = new Player(new Gameboard, true);
ai.gameboardName = 'second';

exampleBoard.forEach((item) => {
  ai.gameboard.placeShip(item[0], item[1]);
});

dom.render(ai);
dom.render(player, true);

gameLogic.setUp(dom, player, ai);
