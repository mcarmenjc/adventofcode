import { day5 as boardingPasses } from './input.js';

function calculateSeatId(seat) {
  let row = calculateRow(seat);
  let column = calculateColumn(seat);
  let seatId = row*8 + column;
  //console.log(`(${row}, ${column}) => ${seatId}`);
  return seatId;
}

function calculateRow(seat) {
  let min = 0;
  let max = 127;

  for(let i = 0; i < 7; i++){
    if(seat[i] === 'F'){
      max = Math.floor((max + min) / 2);
    }

    if(seat[i] === 'B'){
      min = Math.floor((max + min) / 2) + 1;
    }
  }

  return min;
}

function calculateColumn(seat) {
  let min = 0;
  let max = 7;

  for(let i = 7; i < seat.length; i++){
    if(seat[i] === 'L'){
      max = Math.floor((max + min) / 2);
    }

    if(seat[i] === 'R'){
      min = Math.floor((max + min) / 2) + 1;
    }
  }

  return min;
}

function getMissingSeatId(seatIds){
  seatIds.sort((a, b) => {
    return (a - b);
  });
  
  for (let i = 1; i < seatIds.length; i++){
    if (seatIds[i] - seatIds[i-1] === 2){
      return (seatIds[i] - 1);
    }
  }

  return -1;
}

let maxSeatId = 0;
let seatIds = [];

for(let boardingPass of boardingPasses){
  let seatId = calculateSeatId(boardingPass);
  if (seatId > maxSeatId){
    maxSeatId = seatId;
  }
  seatIds.push(seatId);
}

let seatId = getMissingSeatId(seatIds);

console.log(`Answer part 1: ${maxSeatId}`);
console.log(`Answer part 2: ${seatId}`);