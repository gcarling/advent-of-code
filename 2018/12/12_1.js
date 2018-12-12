const _ = require('lodash');
const fs = require('fs');

const IS_TEST = 0;

// const INITIAL_STATE = '#..#.#..##......###...###';

// const transforms = 
// `...## => #
// ..#.. => #
// .#... => #
// .#.#. => #
// .#.## => #
// .##.. => #
// .#### => #
// #.#.# => #
// #.### => #
// ##.#. => #
// ##.## => #
// ###.. => #
// ###.# => #
// ####. => #`.split('\n');

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
const PADDING = 20;

const padding = _.times(PADDING, () => '.');

let currentState = [...padding, ...INITIAL_STATE.split(''), ...padding];

for (let i = 0; i < ITERATIONS; i++) {
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
}

let ans = 0;

const offset = PADDING;

for (let pot = 0; pot < _.size(currentState); pot++) {
  if (currentState[pot] === '#') {
    ans += pot - offset;
  }
}

console.log('ans: ', ans);
