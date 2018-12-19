const _ = require('lodash');
const fs = require('fs');
const util = require('../util');

const IS_TEST = 1;

const WATER_LOC = 500;

const mats = {
  SAND: '.',
  CLAY: '#',
  WATER: '~',
};

function printGridWindow(grid, offset) {
  const startX = WATER_LOC - offset;
  const endX = WATER_LOC + offset;
  for (let i = 0; i < _.size(grid); i++) {
    for (let j = startX; j <= endX; j++) {
      process.stdout.write(grid[i][j]);
    }
    process.stdout.write('\n');
  }
}

function getClayPoints(input) {
  return input.map(line => {
    const split = line.split(', ');

    const clay = {};

    split.forEach(piece => {
      const data = piece.split('=');
      const key = data[0];

      const coords = data[1];

      if (_.includes(coords, '..')) {
        const coordSplit = coords.split('..');
        const start = util.parseNum(coordSplit[0]);
        const end = util.parseNum(coordSplit[1]);

        clay[key] = _.times(end - start+1, i => i + start);
      } else {
        clay[key] = [util.parseNum(coords)];
      }
    });

    return clay;
  });
}

function initGrid(clayPoints) {
  const maxY = _.max(_.maxBy(clayPoints, ({ y }) => _.max(y)).y);

  const grid = _.times(maxY, () => _.times(1001, () => mats.SAND));

  clayPoints.forEach(({ x, y }) => {
    x.forEach(col => {
      y.forEach(row => {
        grid[row-1][col-1] = mats.CLAY;
      });
    });
  });

  return grid;
}

fs.readFile(IS_TEST ? 'test.txt' : 'in.txt', 'utf8', function(err, contents) {
  let ans;

  let input = contents.split('\n');
  input.pop();

  const clayPoints = getClayPoints(input);

  const grid = initGrid(clayPoints);

  printGridWindow(grid, 10);

  console.log('ans: ', ans);
});
