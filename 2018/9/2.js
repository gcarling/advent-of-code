const _ = require('lodash');

// const input = '441 players; last marble is worth 71032 points';

const FINAL_MARBLE = 7103200;
const NUM_ELVES = 441;

let nextMarble = 2;

let curElf = 1;

let zero = {
  value: 0,
};

let one = {
  value: 1,
};


zero.next = one;
zero.prev = one;
one.next = zero;
one.prev = zero;

let curMarble = one;

const elfScores = _.times(NUM_ELVES, () => 0);

while (nextMarble <= FINAL_MARBLE) {
  if (nextMarble % 23 === 0) {
    elfScores[curElf] += nextMarble;

    let toRemove = curMarble;

    for (let i = 0; i < 7; i++) {
      toRemove = toRemove.prev;
    }

    elfScores[curElf] += toRemove.value;

    curMarble = toRemove.next;

    curMarble.prev = toRemove.prev;
    toRemove.prev.next = curMarble;
  } else {
    const newMarble = {
      value: nextMarble,
    };

    const newPrev = curMarble.next;
    const newNext = curMarble.next.next;

    newMarble.prev = newPrev;
    newMarble.next = newNext;

    newNext.prev = newMarble;
    newPrev.next = newMarble;

    curMarble = newMarble;
  }

  nextMarble++;
  curElf = (curElf + 1) % NUM_ELVES;
}

let ans = _.max(elfScores);
console.log('ans: ', ans);
