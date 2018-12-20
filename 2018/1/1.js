const _ = require('lodash');
const fs = require('fs');

 
fs.readFile('in.txt', 'utf8', function(err, contents) {
  const nums = contents.split('\n');
  nums.pop();

  let ans;

  ans = _.sum(_.map(nums, n => parseInt(n, 10)));

  console.log('ans: ', ans);
});
