const gameLogic = (() =>{
  let dom;
  let players = []
  let current = true; // true if is player 1

  const currentPlayer = (ct = true) => {
    let first = ct ? 0 : 1;
    let second = ct ? 1 : 0;
    return players[current ? first : second];
  }


  const setUp = (d, p, p2) => {
    dom = d;
    players[0] = p;
    players[1] = p2;
  }

  const handleClick = (event, idnum = null) => {
    let id;
    if (idnum){
      id = idnum;
    }else{
      id = parseInt(event.target.id.split("-")[2]);
    }

    //no current receiveAttack
    if (currentPlayer(false).gameboard.receiveAttack(Math.floor(id / 10), id % 10)){
      dom.render(currentPlayer(), currentPlayer(false).ai);
      dom.render(currentPlayer(false), true);

      current = !current;
      // if Artifical inteligence.

      if (currentPlayer().gameboard.allSunk()) {
        dom.render(currentPlayer(), true);
        dom.render(currentPlayer(false), true);
        dom.winnerMessage(currentPlayer(false));
      } else if(currentPlayer().ai){
        aiPlayer(currentPlayer(false));
      }
    }
  }

  const aiPlayer = (player) => {
    let playerBoard = []
    player.gameboard.grid.forEach((x, i) =>  { if (x !== "X" || x !== "Y") playerBoard.push(i);});
    if(playerBoard[0] === 0) playerBoard.shift();
    setTimeout(() =>{
      handleClick(false, playerBoard[Math.floor(Math.random() * playerBoard.length)]);
    }, 2000);
  }

  return {setUp, handleClick}
})();
export default gameLogic;
