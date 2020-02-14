export default class Ship {
  constructor() {
    this.positions = [];
  }
  get length() {
    return this.positions.length;
  }
  hit(id){
    this.positions.forEach((item) => {
      if(item.id === id) item.hited = true;
    });
  }
  hitXY(x,y){
    this.positions.forEach((item) => {
      if(item.x === x && item.y === y) item.hited = true;
    });
  }
  isSunk(){
    return this.positions.every(x => x.hited);
  }
  addPosition(position){
    this.positions.push(position);
  }
}