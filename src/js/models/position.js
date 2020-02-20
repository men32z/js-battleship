export default class Position {
  constructor(id) {
    this.id = id;
    this.x = id % 10;
    this.y = Math.floor(id / 10);
    this.hited = false;
  }
}