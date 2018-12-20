const _ = require('lodash');
const fs = require('fs');

const IS_TEST = 0;

const SERIAL_NUMBER = 3214;

const GRID_SIZE = 300;

let ans;

const fuelCells = _.times(GRID_SIZE, () => _.times(GRID_SIZE, () => 0));

for (let x = 0; x < GRID_SIZE; x++) {
  for (let y = 0; y < GRID_SIZE; y++) {
    const rackID = x + 10;
    let power = y * rackID;
    power += SERIAL_NUMBER;
    power *= rackID;

    power = power % 1000;

    if (power < 100) {
      power = 0;
    } else {
      power = Math.floor(power / 100);
    }

    power -= 5;

    fuelCells[x][y] = power;
  }
}

let bestScore = 0;
let bestX;
let bestY;
let bestSize;

for (let size = 1; size < GRID_SIZE; size++) {
  for (let x = 0; x < GRID_SIZE - size + 1; x++) {
    for (let y = 0; y < GRID_SIZE - size + 1; y++) {
  
      let total = 0;
  
      for (let i = x; i < x + size; i++) {
        for (let j = y; j < y + size; j++) {
          total += fuelCells[i][j];
        }
      }
  
      if (total > bestScore) {
        bestScore = total;
        bestX = x;
        bestY = y;
        bestSize = size;
      }
    }
  }
}

ans = `${bestX},${bestY},${bestSize}`;

console.log('ans: ', ans);
