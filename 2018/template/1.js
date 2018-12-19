const _ = require('lodash');
const fs = require('fs');

const IS_TEST = 0;

fs.readFile(IS_TEST ? 'test.txt' : 'in.txt', 'utf8', function(err, contents) {
  let ans;

  // let inputs = contents;

  let input = contents.split('\n');
  input.pop();

  input.forEach(line => {

  });  

  console.log('ans: ', ans);
});
