const _ = require('lodash');
const fs = require('fs');

const IS_TEST = 0;

const mats = {
  OPEN: '.',
  TREE: '|',
  LUMBER: '#',
};

const NUM_ITERATIONS = 1000000000;

function printArea(area) {
  area.forEach(line => console.log(line.join('')));
  console.log();
}

function initArea(input) {
  return input.map(line => line.split(''));
}

function getValueAt(area, i, j) {
  if (i < 0 || j < 0 | i >= _.size(area) || j >= _.size(area[i])) return mats.OPEN;

  return area[i][j];
}

// iterates once, returns new area
function runIteration(area) {
  const next = _.cloneDeep(area);
  for (let row = 0; row < _.size(area); row++) {
    for (let col = 0; col < _.size(area[row]); col++) {

      const cur = area[row][col];
      const counts = {
        [mats.OPEN]: 0,
        [mats.TREE]: 0,
        [mats.LUMBER]: 0,
      };

      for (let i = row-1; i <= row+1; i++) {
        for (let j = col-1; j <= col+1; j++) {
          if (i === row && j === col) continue;

          counts[getValueAt(area, i, j)]++;
        }
      }

      if (cur === mats.OPEN && counts[mats.TREE] >= 3) {
        next[row][col] = mats.TREE;
      }
      if (cur === mats.TREE && counts[mats.LUMBER] >= 3) {
        next[row][col] = mats.LUMBER;
      }
      if (cur === mats.LUMBER && (counts[mats.LUMBER] == 0 || counts[mats.TREE] == 0)) {
        next[row][col] = mats.OPEN;
      }
    }
  }

  return next;
}

fs.readFile(IS_TEST ? 'test.txt' : 'in.txt', 'utf8', function(err, contents) {
  let ans;

  let input = contents.split('\n');
  input.pop();

  let area = initArea(input);

  const pastAreas = [];

  let loopStartInd = 0;
  let loop = [];

  for (let i = 0; i < NUM_ITERATIONS; i++) {
    pastAreas.push(area);
    area = runIteration(area);

    // find first location of looping
    if (_.isEmpty(loop) && _.some(pastAreas, past => _.isEqual(past, area))) {
      loopStartInd = i;
      loop.push(area);
      continue;
    }

    // if we have a loop
    if (!_.isEmpty(loop)) {
      // if we found the start, stop
      if (_.isEqual(_.first(loop), area)) {
        break;
      }

      // otherwise, push
      loop.push(area);
    }
  };

  const finalInd = (NUM_ITERATIONS - loopStartInd - 1) % _.size(loop);
  
  area = loop[finalInd];

  const numTrees = _.sumBy(area, row => _.sumBy(row, square => square === mats.TREE ? 1 : 0));
  const numLumber = _.sumBy(area, row => _.sumBy(row, square => square === mats.LUMBER ? 1 : 0));

  ans = numTrees * numLumber;

  console.log('ans: ', ans);
});
