import image from '../img/drag.png';

const dom = (() => {
  const preRender = (startGame) => {
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
            <p> Move the ships by dragging the achor <img src="${image}" with="30" height="30"> </p>
            <div class="boxcontainer" id="ini"></div>
        </div>
        <div class="col-12 text-center mt-2">
          <h3 id="message"></h3>
        </div>
        <div class="col-12 mt-3">
          <button class="btn btn-success" id="startGame">Start Game </button>
        </div>
      </div>
    </div>
    `;
    document.getElementById('startGame').addEventListener('click', () => startGame());
  };

  const render = (grid, dragStart, dropping) => {
    const main = document.getElementById('ini');
    let toRend = '';
    for (let i = 1; i <= 100; i += 1) {
      const classes = grid[i] ? ['ship'] : [];
      if (grid[i] && grid[i].first) classes.push('firstItem');
      toRend += `
      <div id="position-${i}" class="${classes.join(' ')}"
      ${grid[i] ? `data-shipid="${grid[i].id}"` : ''}

       ${grid[i] && grid[i].first ? 'draggable="true"' : ''}>
      </div>`;
    }
    main.innerHTML = toRend;

    // draggable events
    for (let i = 1; i <= 100; i += 1) {
      if (grid[i] && grid[i].first) {
        document.getElementById(`position-${i}`).addEventListener('dragstart', (event) => dragStart(event));
      }
    }

    // dropping events
    for (let i = 1; i <= 100; i += 1) {
      if (!grid[i]) {
        document.getElementById(`position-${i}`).addEventListener('drop', event => dropping(event));
      }
    }
  };


  return { preRender, render };
})();

export default dom;
