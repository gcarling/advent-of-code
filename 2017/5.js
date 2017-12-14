const _ = require ('lodash');
const fs = require('fs');

fs.readFile('./5_in.txt', 'utf8', (err, res) => {
  const input = _.map(res.split('\n'), _.toNumber);

  let num = 0;
  let curInd = 0;

  while(true) {
    // console.log('curInd: ', curInd);
    const step = input[curInd];

    // answer for part one just remove this if statement
    if (step >= 3) {
      input[curInd] = step - 1;
    } else {
      input[curInd] = step + 1;
    }

    curInd = curInd + step;

    num++;

    if (curInd < 0 || curInd >= input.length - 1) break;
  }

  console.log('num: ', num);

});
