const _ = require('lodash');
const fs = require('fs');

 
fs.readFile('test.txt', 'utf8', function(err, contents) {
  const input = contents.split('\n');

  const squareMap = {};

  _.each(input, line => {
    if (!line) return;

    const split = line.split(' ');

    const start = split[2].replace(':', '');

    const startSplit = start.split(',');

    const left = parseInt(startSplit[0]);
    const top = parseInt(startSplit[1]);

    const size = split[3].split('x');

    const width = parseInt(size[0]);
    const height = parseInt(size[1]);

    for (i = left; i < left + width; i++) {
      for (j = top; j < top + height; j++) {
        const key = i + ',' + j;
        if (squareMap[key]) {
          squareMap[key]++;
        } else {
          squareMap[key] = 1;
        }
      }
    }
  });

  let total = 0;

  _.mapKeys(squareMap, (val, key) => {
    if (val > 1) total++;
  });

  console.log(total);

});
