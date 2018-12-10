const _ = require('lodash');

const IS_TEST = 0;

// const input = '441 players; last marble is worth 71032 points';

// const FINAL_MARBLE = 71032;
// const NUM_ELVES = 441;
const FINAL_MARBLE = 25;
const NUM_ELVES = 9;

let nextMarble = 1;

let curMarbleInd = 0;
let curElf = 0;

const marbles = [0];
const elfScores = _.times(NUM_ELVES, () => 0);

while (nextMarble <= FINAL_MARBLE) {
  if (nextMarble % 23 === 0) {
    console.log('nextMarble: ', nextMarble);
    elfScores[curElf] += nextMarble;

    const toRemove = (curMarbleInd - 7) % _.size(marbles);
    console.log('toRemove: ', toRemove);
    console.log('marbles: ', marbles);

    const removed = marbles.splice(toRemove, 1);

    console.log('removed: ', removed);
    elfScores[curElf] += removed;

    curMarble = marbles[(toRemove+1) % _.size(marbles)];
  } else {
    let newInd = (curMarbleInd+2) % _.size(marbles);
  
    marbles.splice(newInd);
    marbles[newInd] = nextMarble;

    console.log('marbles: ', marbles);
  
    curMarbleInd = newInd;
  }

  nextMarble++;
  curElf = (curElf + 1) % NUM_ELVES;
}

let ans = _.max(elfScores);
console.log('ans: ', ans);
