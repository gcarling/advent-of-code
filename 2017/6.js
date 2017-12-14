const _ = require('lodash');

const input = [2, 8, 8, 5, 4, 2, 3, 1, 5, 5, 1, 2, 15, 13, 5, 14];

let cur = _.clone(input);

let numLoops = 0;

const seenStates = [input];

while (true) {
  numLoops++;

  let val = _.max(cur);

  let ind = cur.indexOf(val);

  cur[ind] = 0;

  while (val > 0) {
    ind++;

    if (ind === cur.length) ind = 0;

    cur[ind] = cur[ind] + 1;

    val--;
  }

  if (_.some(seenStates, state => _.isEqual(cur, state))) {
    const ind = _.findIndex(seenStates, state => _.isEqual(cur, state));
    console.log('ans: ', numLoops - ind);
    break;
  } 

  seenStates.push(_.clone(cur));
}

// Part 1 just return numLoops
// console.log('numLoops: ', numLoops);
