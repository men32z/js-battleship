/* eslint no-use-before-define: ["error", { "functions": false }] */
const gameLogic = (() => {
  let dom;
  const players = [];
  let current = true; // true if is player 1

  const currentPlayer = (ct = true) => {
    const first = ct ? 0 : 1;
    const second = ct ? 1 : 0;
    return players[current ? first : second];
  };


  const setUp = (d, p, p2) => {
    dom = d;
    players[0] = p;
    players[1] = p2;
    dom.turnMessage(currentPlayer());
  };

  const handleClick = (event, idnum = null) => {
    let id;
    let secondAttack = false;
    if (idnum) {
      id = idnum;
    } else {
      id = parseInt(event.target.id.split('-')[2], 10);
    }


    // no current receiveAttack
    if (currentPlayer(false).gameboard.validAttack(Math.floor(id / 10), id % 10)) {
      if (currentPlayer(false).gameboard.receiveAttack(Math.floor(id / 10), id % 10)) {
        dom.render(currentPlayer(), currentPlayer(false).ai);
        dom.render(currentPlayer(false));
        dom.turnMessage(currentPlayer());
        secondAttack = id;
      } else {
        dom.render(currentPlayer(), currentPlayer(false).ai);
        dom.render(currentPlayer(false), true);
        current = !current;
        dom.turnMessage(currentPlayer());
      }

      if (currentPlayer().gameboard.allSunk()) {
        dom.render(currentPlayer(), true);
        dom.render(currentPlayer(false), true);
        dom.winnerMessage(currentPlayer(false));
      } else if (currentPlayer().ai) {
        let shoot = currentPlayer(false).getAiAttack(secondAttack);
        setTimeout(() => {
          handleClick(false, shoot);
        }, 2000);
      }
    }
  };

  return { setUp, handleClick };
})();
export default gameLogic;
