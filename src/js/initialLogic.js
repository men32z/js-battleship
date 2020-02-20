import dom from './initialDom';

const initialLogic = (() =>{
  let grid = new Array(101).fill(null);
  let counter = 0;
  let ships = [];

  const dragStart = (event) => {
      event.dataTransfer.setData("aid", parseInt(event.target.id.split("-")[1]));
      event.dataTransfer.setData("ship-id", parseInt(event.target.dataset.shipid));
  }

  const dropping = (event) => {
      let landing  = parseInt(event.target.id.split("-")[1]);
      let originId = parseInt(event.dataTransfer.getData('aid'));
      let ship = ships.find(x => x.id === parseInt(event.dataTransfer.getData('ship-id')));
      let dif = landing - originId;

      let shipCal = ship.positions.map(x=>{
        let position = x.position + dif;
        return {id: x.id, first: x.first, position, startPosition: x.position}
      });

      let flag = true;
      let startEnd = [];
      shipCal.forEach((i) => {
        if(i.position < 1) flag = false;
        if(i.position > 100) flag = false;
        if(grid[i.position]) flag = false;
        let start = i.startPosition - 1 < 10? 0 : Math.floor((i.startPosition - 1)/10)
        let end = i.position - 1 < 10? 0 : Math.floor((i.position - 1) /10)
        startEnd.push([start, end]);
      });

      let pos = Math.floor(ship.positions[0].position/10)
      if (ship.positions.every(x => Math.floor(x.position/10) === pos)) {
        if(!startEnd.every(
          x => x[0] === startEnd[0][0] && x[1] === startEnd[0][1] )) flag=false;
      }

      console.log(ship);
      console.log(shipCal);
      if(flag){
        //clean current postion
        ship.positions.forEach((i) => {
          grid[i.position] = null;
        });
        let modified = [];
        shipCal.forEach((i) => {
          let obj = {id: i.id, first: i.first, position: i.position}
          grid[i.position] = obj;
          modified.push(obj);
        });
        ship.positions = modified;
      }

      dom.render(grid, dragStart, dropping);
      console.log(ships);
  }

  const setUp = (arr) => {
    dom.preRender();
    arr.forEach((item) => {
      placeShip(item[0], item[1]);
    });
    dom.render(grid, dragStart, dropping);
  }


  const placeShip = (sta, end) => {
      let start = [...sta];
      counter += 1;
      let z = start[0] === end[0] ? 1 : 0;
      let flag = true;

      let ship = {id: counter, positions: []}
      while(start[z] <= end[z]){
          let position = (start[z === 0 ? z : 0] * 10) + start[z === 1 ? z : 1];
          let obj = {id: counter, first: flag, position}
          grid[position] = obj;
          ship.positions.push(obj);
          flag = false;
          start[z] += 1;
      }
      ships.push(ship);
  }

  return {setUp}
})();
export default initialLogic;
