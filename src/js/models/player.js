export default class Player {
  constructor(gameboard, ai = false) {
    this.ai = ai;
    this.gameboard = gameboard;
  }

  getAiAttack(secondAttack) {
    const playerBoard = [];
    this.gameboard.grid.forEach((x, i) => { if (!x.hited) playerBoard.push(i); });
    if (playerBoard[0] === 0) playerBoard.shift();
    let ads = [];

    if (secondAttack) {
      if (secondAttack % 10 !== 1) ads.push(secondAttack - 1);
      if (secondAttack % 10 !== 0) ads.push(secondAttack + 1);
      ads.push(secondAttack + 10);
      ads.push(secondAttack - 10);
      ads = ads.filter((item) => playerBoard.includes(item));
    }
    let shoot = playerBoard[Math.floor(Math.random() * playerBoard.length)];
    if (ads.length > 0) shoot = ads[Math.floor(Math.random() * ads.length)];

    return shoot;
  }
}
