const dom = (() => {
  const message = (message) => {
    document.getElementById('message').innerHTML = message;
  }

  const preRender = () => {
    let main = document.getElementById('content');
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
            <p> Instructions </p>
            <div class="boxcontainer" id="ini"></div>
        </div>
        <div class="col-12 text-center mt-2">
          <h3 id="message"></h3>
        </div>
      </div>
    </div>
    `;
  }

  const render = (grid) => {
    let main = document.getElementById('ini');
    let toRend = '';
    for (let i = 1; i <= 100; i++) {
      let classes =  grid[i] ? ['ship'] : [];
      if(grid[i] && grid[i].first) classes.push('firstItem');
      toRend += `
      <div id="position-${i}" class="${classes.join(' ')}"
       ${grid[i] && grid[i].first ? 'draggable="true"' : ''}>
      </div>`;
    }
    main.innerHTML = toRend;

    //events
    // if (!blockEvents) {
    //   for (let i = 1; i <= 100; i++) {
    //     document.getElementById(`${player.gameboardName}-position-${i}`).addEventListener('click', (event) => controller.handleClick(event));
    //   }
    // }
  }



  return {preRender, render}
})();

export default dom;
