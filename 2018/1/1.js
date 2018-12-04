const _ = require('lodash');
const fs = require('fs');

 
fs.readFile('in.txt', 'utf8', function(err, contents) {
  const nums = contents.split('\n');

  let total = 0;

  const reached = {};

  while (true) {
    _.each(nums, numStr => {
      const num = parseInt(numStr, 10)
      if (isNaN(num)) return;
  
      total += num;
  
      // console.log(total);
  
      if (reached[total]) {
        console.log(total);
        process.exit(1);
      } else {
        reached[total] = 1;
      }
    });
  }

});
