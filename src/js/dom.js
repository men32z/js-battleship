const dom = (() => {
  let controller;
  const setController = (contro) => {
    controller = contro;
  };

  const message = (message) => {
    document.getElementById('message').innerHTML = message;
  };

  const preRender = () => {
    const main = document.getElementById('content');
    main.innerHTML = `
    <div class="container-fluid bg-dark text-white text-center">
      <div class="container">
        <div class="row">
          <div class="col-12 py-3">
            <h1>Battleship</h1>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-6">
            <h2> Your Board </h2>
            <div class="boxcontainer" id="first"></div>
        </div>
        <div class="col-md-6">
            <h2> Not your board </h2>
            <div class="boxcontainer" id="second"></div>
        </div>
        <div class="col-12 text-center mt-2">
          <h3 id="message"></h3>
        </div>
      </div>
    </div>
    `;
  };

  const render = (player, blockEvents = false) => {
    const main = document.getElementById(player.gameboardName);
    let toRend = '';
    for (let i = 1; i <= 100; i += 1) {
      const cp = player.gameboard.grid[i]; // current position
      const classes = cp && cp !== 'X' && !player.ai ? ['ship'] : [];
      if (cp && cp === 'Y') classes.push('ship-border');
      toRend += `
      <div id="${player.gameboardName}-position-${i}"
           class="${classes.join(' ')}">
        ${cp === 'X' || cp === 'Y' ? 'X' : ''}
      </div>`;
    }
    main.innerHTML = toRend;

    // events
    if (!blockEvents) {
      for (let i = 1; i <= 100; i += 1) {
        const item = document.getElementById(`${player.gameboardName}-position-${i}`);
        item.addEventListener('click', controller.handleClick);
      }
    }
  };

  const winnerMessage = (player) => {
    message(`${player.ai ? 'AI is' : 'You are'} the winner!!!`);
  };

  const turnMessage = (player) => {
    message(`${player.ai ? 'Computer\'s' : 'your'} turn`);
  };

  return {
    preRender, render, setController, winnerMessage, turnMessage,
  };
})();

export default dom;
