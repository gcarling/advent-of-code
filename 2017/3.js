const _ = require('lodash');

let input = 312051;

let start = 1;

let spiral = [];

let dir = 'RIGHT';

let found = false;

_.each(_.range(5), num => {
  const newSpiral = _.times(start, () => _.times(start, () => -1));

  // console.log('newSpiral: ', newSpiral);
  if (num !== 0) {
    _.each(spiral, (row, i) => {
      _.each(row, (col, j) => {
        newSpiral[i+1][j+1] = spiral[i][j];
      })
    });
  
    // console.log(newSpiral)
  
  }
  spiral = newSpiral;

  // console.log('start: ', start);

  let i = start - 2;
  let j = start - 1;

  if (start === 1) {
    i = 0;
  }

  // bound of grid
  const end = start - 1;

  const lastStart = _.max([start - 2, 0]);

  const oldSize = lastStart * lastStart;

  const newSize = start * start;

  _.each(_.range(oldSize, newSize), index => {
    const ind = index + 1;

    const neighbors = [];

    // for part 1 just use ind rather than this calculation
    for (r = i-1; r <= i+1; r++) {
      for (c = j-1; c <= j+1; c++) {
        if (r === i && c === j) continue;

        neighbors.push((spiral[r] || [])[c]);
      }
    }
    const total = start === 1 ? 1 : _.sum(_.filter(neighbors, num => num && num !== -1));

    if (total > input && !found) {
      found = true;
      console.log('\n\n\n');
      console.log('GG');
      console.log(total);
      console.log('\n\n\n');
    }

    spiral[i][j] = total;

    if (ind === newSize) return;

    if (dir === 'RIGHT') {
      if (j === end) {
        dir = 'UP';
        i--;
      } else {
        j++;
      }
      return;
    }

    if (dir === 'UP') {
      if (i === 0) {
        dir = 'LEFT';
        j--;
      } else {
        i--;
      }
      return;
    }

    if (dir === 'LEFT') {
      if (j === 0) {
        dir = 'DOWN';
        i++;
      } else {
        j--;
      }
      return;
    }

    if (dir === 'DOWN') {
      if (i === end) {
        dir = 'RIGHT';
        j++;
      } else {
        i++;
      }
      return;
    }
  });

  // console.log(start, spiral);
  start = start + 2;
  dir = 'RIGHT';
});

// _.each(spiral, row => {
//   console.log(row);
// });

// console.log(spiral[spiral.length-1][spiral.length-1]);

let lI;
let lJ;

const center = _.floor(spiral.length / 2);

// console.log('center: ', center);

// input = 27;

// _.each(spiral, (row, i) => {
//   _.each(row, (col, j) => {
//     if (spiral[i][j] === input) console.log(i, j);
//   });
// });


