const _ = require('lodash');
const fs = require('fs');

 
fs.readFile('in.txt', 'utf8', function(err, contents) {
  const input = contents.split('\n');

  const squareMap = {};

  const allIDs = [];
  const taintedIDs = [];

  _.each(input, line => {
    if (!line) return;

    const split = line.split(' ');

    const ID = split[0].replace('#', '');
    allIDs.push(ID);

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
          _.each(squareMap[key], taintedID => {
            if (!_.includes(taintedIDs, taintedID)) {
              taintedIDs.push(taintedID);
            }
          });
          if (!_.includes(taintedIDs, ID)) {
            taintedIDs.push(ID);
          }
          squareMap[key].push(ID);
        } else {
          squareMap[key] = [ID];
        }
      }
    }
  });

  let result;

  _.each(allIDs, ID => {
    if (!_.includes(taintedIDs, ID)) {
      result = ID;
    }
  });

  console.log(result);

});
