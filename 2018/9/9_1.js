const _ = require('lodash');

// const input = '441 players; last marble is worth 71032 points';

const FINAL_MARBLE = 71032;
const NUM_ELVES = 441;

let nextMarble = 2;

let curMarbleInd = 1;
let curElf = 1;

let marbles = [0, 1];
const elfScores = _.times(NUM_ELVES, () => 0);

while (nextMarble <= FINAL_MARBLE) {
  if (nextMarble % 23 === 0) {
    elfScores[curElf] += nextMarble;

    let toRemove = (curMarbleInd - 7);
    if (toRemove < 0) {
      toRemove = _.size(marbles) + toRemove;
    }

    const removed = marbles.splice(toRemove, 1)[0];

    elfScores[curElf] += removed;

    curMarbleInd = toRemove % _.size(marbles);
  } else {
    let newInd = (curMarbleInd+2) % _.size(marbles);
  
    const rest = marbles.splice(newInd);
    marbles = [...marbles, nextMarble, ...rest];

    curMarbleInd = newInd;
  }

  nextMarble++;
  curElf = (curElf + 1) % NUM_ELVES;
}

let ans = _.max(elfScores);
console.log('ans: ', ans);
