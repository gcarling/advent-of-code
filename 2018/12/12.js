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

const ITERATIONS = 20;
const PADDING = 3;

const padding = _.times(PADDING, () => '.');

let offset = 0;

let currentState = INITIAL_STATE.split('');

for (let i = 0; i < ITERATIONS; i++) {
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

let ans = 0;

for (let pot = 0; pot < _.size(currentState); pot++) {
  if (currentState[pot] === '#') {
    ans += pot + offset;
  }
}

console.log('ans: ', ans);
