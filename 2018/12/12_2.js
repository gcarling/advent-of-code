const _ = require('lodash');
const fs = require('fs');

const INITIAL_STATE = '#.......##.###.#.#..##..##..#.#.###..###..##.#.#..##....#####..##.#.....########....#....##.#..##...';

const transforms = 
`..... => .
#.... => .
..### => .
##..# => #
.###. => #
...## => .
#.#.. => .
..##. => .
##.#. => #
..#.. => .
.#... => #
##.## => .
....# => .
.#.#. => .
#..#. => #
#.### => .
.##.# => #
.#### => .
.#..# => .
####. => #
#...# => #
.#.## => #
#..## => .
..#.# => #
#.##. => .
###.. => .
##### => #
###.# => #
...#. => #
#.#.# => #
.##.. => .
##... => #`.split('\n');

const ITERATIONS = 5000000;
const PADDING = 3;

const padding = _.times(PADDING, () => '.');

let offset = 0;

let currentState = INITIAL_STATE.split('');

let prevState;

let i;

for (i = 0; i < ITERATIONS; i++) {
  if (_.isEqual(currentState, prevState)) {
    break;
  }
  prevState = currentState;
  currentState = [...padding, ...currentState, ...padding];
  currentState = currentState.map((pot, ind) => {
    const piece = currentState.slice(ind - 2, ind + 3).join('');

    if (_.size(piece < 5)) {
      return '.';
    }

    const found = _.find(transforms, transform => {
      const split = transform.split(' => ');
      if (split[0] === piece) {
        return true;
      }
    });

    if (found) {
      return found.split(' => ')[1];
    }

    return '.';
  });

  const firstIndex = _.indexOf(currentState, '#');
  const lastIndex = _.lastIndexOf(currentState, '#');

  currentState = currentState.slice(firstIndex, lastIndex+1);

  offset += firstIndex - PADDING;
}

const MAX = 50000000000;

offset += MAX - i

console.log('MAX: ', MAX);

let ans = 0;

for (let pot = 0; pot < _.size(currentState); pot++) {
  if (currentState[pot] === '#') {
    ans += pot + offset;
  }
}

console.log('ans: ', ans);
