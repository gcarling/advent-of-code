const _ = require('lodash');
const fs = require('fs');
const util = require('../util');

const IS_TEST = 0;

const WATER_LOC = 499;

const mats = {
  SAND: '.',
  CLAY: '#',
  WATER_STILL: '~',
  WATER_FALLING: '|',
};

function isWater(mat) {
  return _.includes([mats.WATER_FALLING, mats.WATER_STILL], mat);
}

function isFlowing(mat) {
  return _.includes([mats.WATER_FALLING, mats.SAND], mat);
}

function isSolid(mat) {
  return _.includes([mats.CLAY, mats.WATER_STILL], mat);
}

function printGridWindow(grid, offset = 250) {
  const startX = WATER_LOC - offset;
  const endX = WATER_LOC + offset;
  for (let i = 0; i < _.size(grid); i++) {
    for (let j = startX; j <= endX; j++) {
      process.stdout.write(grid[i][j]);
    }
    process.stdout.write('\n');
  }
  process.stdout.write('\n');
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

  const grid = _.times(maxY, () => _.times(1000, () => mats.SAND));

  clayPoints.forEach(({ x, y }) => {
    x.forEach(col => {
      y.forEach(row => {
        grid[row-1][col-1] = mats.CLAY;
      });
    });
  });

  return grid;
}

function handleWaterFall(grid, waterStartX, waterStartY) {
  let waterX = waterStartX;
  let waterY = waterStartY;

  // while we are falling 1) in the grid 2) through sand
  while (waterY < _.size(grid)-1 && isFlowing(grid[waterY+1][waterX])) {
    grid[waterY][waterX] = mats.WATER_FALLING;
    waterY++;
  }

  if (waterY >= _.size(grid)) return;

  // check if we have a full solid base
  let solidBase = true;
  let curX; 

  function flowToHole(x, y) {
    printGridWindow(grid);
    grid[y][x] = mats.WATER_FALLING;

    // we're at the end
    if (!grid[y+1]) return true;

    if (!isSolid(grid[y+1][x])) {
      handleWaterFall(grid, x, y+1);
      return true;
    }
    return false;
  }
  
  // moving left: if ground isn't solid, we have to bail
  for (curX = waterX; isFlowing(grid[waterY][curX]); curX--) {
    if (flowToHole(curX, waterY)) {
      solidBase = false;
      break;
    }
  }
  const minX = curX+1;
  for (curX = waterX; isFlowing(grid[waterY][curX]); curX++) {
    if (flowToHole(curX, waterY)) {
      solidBase = false;
      break;
    }
  }
  const maxX = curX-1;

  // if we don't have a solid base to work on, return here
  if (!solidBase) return;

  // since we have a solid base, we can fill this in with solid water
  for (x = minX; x <= maxX; x++) {
    grid[waterY][x] = mats.WATER_STILL;
  }

  printGridWindow(grid);

  // now we start over
  handleWaterFall(grid, waterStartX, waterStartY);
}

fs.readFile(IS_TEST ? 'test.txt' : 'in.txt', 'utf8', function(err, contents) {
  let ans;

  let input = contents.split('\n');
  input.pop();

  const clayPoints = getClayPoints(input);

  const grid = initGrid(clayPoints);

  handleWaterFall(grid, WATER_LOC, 0);

  ans = _.sumBy(grid, row => _.sumBy(row, square => _.includes([mats.WATER_FALLING, mats.WATER_STILL], square) ? 1 : 0));

  console.log('ans: ', ans);
});
