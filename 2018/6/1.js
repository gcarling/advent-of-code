
const _ = require('lodash');
const fs = require('fs');

function getCoords(str) {
  const split = str.split(',');
  const x = parseInt(split[0]);
  const y = parseInt(split[1]);
  return [x, y];
}

fs.readFile('in.txt', 'utf8', function(err, contents) {
  let input = contents.split('\n');

  let maxX = 0;
  let maxY = 0;

  let minX = 99999;
  let minY = 99999;

  const all = {};
  
  input.forEach(line => {
    if (!line) return;

    const [x, y] = getCoords(line);

    if (x > maxX) {
      maxX = x;
    }
    if (y > maxY) {
      maxY = y;
    }

    if (x < minX) {
      minX = x;
    }
    if (y < minY) {
      minY = y;
    }

    all[x + ',' + y] = 0;
  });

  for (let cX = minY; cX < maxX; cX++) {
    for (let cY = minY; cY < maxY; cY++) {
      let numAtDist = 0;
      let bestDist = 99999;
      let pair;
      _.keys(all).forEach(str => {
        const [x, y] = getCoords(str);
        const dist = Math.abs(x - cX) + Math.abs(y - cY);

        if (dist < bestDist) {
          numAtDist = 1;
          bestDist = dist;
          pair = x + ',' + y;
        }
      });

      if (numAtDist > 1) continue;

      const [x, y] = getCoords(pair);

      if (x === minX || x === maxX || y === minY || y === maxY ) continue;

      all[pair]++;
    }
  }

  let best = 0;

  _.keys(all).forEach(str => {
    const [x, y] = getCoords(str);

    const val = all[str];

    if (val > best) {
      best = val;
    }
  });

  console.log(best);

});
