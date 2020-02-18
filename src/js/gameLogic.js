const gameLogic = (() =>{
  let dom;
  let players = []
  let current = true; // true if is player 1

  const setUp = (d, p, p2) => {
    dom = d;
    players[0] = p;
    players[1] = p2;
  }

  const handleClick = (event) => {
    let id = parseInt(event.target.id.split("-")[2]);

    if (players[current ? 1 : 0].gameboard.receiveAttack(Math.floor(id / 10), id % 10)){
      current = !current;
      dom.render(players[current ? 1 : 0]);
      dom.render(players[current ? 0 : 1], true);
    }


  }
  return {setUp, handleClick}
})();
export default gameLogic;
