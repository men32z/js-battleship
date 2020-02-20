import initialLogic from './js/initialLogic';

document.addEventListener('dragover', (event) => {
  event.preventDefault();
});

const exampleBoard = [
  [[1, 2], [1, 2]],
  [[0, 8], [0, 8]],
  [[8, 2], [8, 2]],
  [[8, 8], [8, 8]],

  [[5, 2], [6, 2]],
  [[4, 4], [4, 5]],

  [[3, 1], [3, 3]],
  [[2, 4], [2, 6]],
  [[2, 9], [4, 9]],

  [[6, 4], [6, 8]],
];


initialLogic.setUp(exampleBoard);
