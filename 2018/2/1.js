const _ = require('lodash');
const fs = require('fs');

 
fs.readFile('in.txt', 'utf8', function(err, contents) {
  const input = contents.split('\n');

  let numTwo = 0;
  let numThree = 0;

  _.each(input, str => {
    const counts = {};

    _.each(str.split(''), char => {
      if (counts[char]) {
        counts[char]++;
      } else {
        counts[char] = 1;
      }
    });

    let got2 = false;
    let got3 = false;

    _.each(_.keys(counts), key => {
      if (counts[key] == 2 && !got2) {
        numTwo++;
        got2 = true;
      }
      if (counts[key] == 3 && !got3) {
        numThree++;
        got3 = true;
      }
    });
  });

  console.log(numTwo * numThree);
});
