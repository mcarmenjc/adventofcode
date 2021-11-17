import { day3 as map } from './input.js';

class Move {
  constructor(down, right){
    this.down = down;
    this.right = right;
  }
}

function getNumberOfTreesOnRouteDown(map, move){
  let mapWidth = map[0].length;
  let numTrees = 0;

  for(let i = 0, j = 0; i < map.length; i += move.down, j = (j + move.right)%mapWidth){
    if (map[i][j] === '#'){
      numTrees += 1;
    }
  }

  return numTrees;
}

let moves = [
  new Move(1, 1),
  new Move(1, 3),
  new Move(1, 5),
  new Move(1, 7),
  new Move(2, 1)
];

let result = 1;

for (let move of moves){
  let numTreesOnRoute = getNumberOfTreesOnRouteDown(map, move);
  console.log(`Number of trees down to the airport with move (right: ${move.right}, down: ${move.down}): ${numTreesOnRoute}`);
  result *= numTreesOnRoute;
}

console.log(`Answer: ${result}`);