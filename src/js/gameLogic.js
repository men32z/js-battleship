const gameLogic = (() =>{
  let dom;
  let players = []
  let current = true; // true if is player 1

  const setUp = (d, p, p2) => {
    dom = d;
    players[0] = p;
    players[1] = p2;
  }

  const handleClick = (event, idnum = null) => {
    let id;
    if (idnum){
      id = idnum;
      console.log(event);
      console.log(id);
    }else{
      id = parseInt(event.target.id.split("-")[2]);
      console.log(id);
    }

    if (players[current ? 1 : 0].gameboard.receiveAttack(Math.floor(id / 10), id % 10)){
      current = !current;
      dom.render(players[current ? 1 : 0]);
      dom.render(players[current ? 0 : 1], true);

      if(players[current ? 0 : 1].ai){
        aiPlayer(players[current  ? 1 : 0]);
      }
    }


  }

  const aiPlayer = (player) => {
    // Grap the board
    let playerBoard = []
    player.gameboard.grid.forEach((x, i) =>  { if (x !== "X") playerBoard.push(i);});
    playerBoard.shift();
    console.log(playerBoard);
    setTimeout(() =>{
      handleClick(false, playerBoard[Math.floor(Math.random() * playerBoard.length)]);
    }, 2000);


  }

  return {setUp, handleClick}
})();
export default gameLogic;
