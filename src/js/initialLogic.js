import dom from './initialDom';

const initialLogic = (() =>{
  let grid = new Array(101).fill(null);
  let counter = 0;

  const setUp = (arr) => {
    dom.preRender();
    arr.forEach((item) => {
      placeShip(item[0], item[1]);
    });
    dom.render(grid);
  }

  const placeShip = (sta, end) => {
      let start = [...sta];
      counter += 1;
      let z = start[0] === end[0] ? 1 : 0;
      let flag = true;

      while(start[z] <= end[z]){
          let position = (start[z === 0 ? z : 0] * 10) + start[z === 1 ? z : 1];
          grid[position] = {id: counter, first: flag};
          flag = false;
          start[z] += 1;
      }
  }

  return {setUp}
})();
export default initialLogic;
