const _ = require('lodash');
const fs = require('fs');
const utils = require('../util');

let registers;

// all the functions we need
const ops = {
  addr: (a, b, c) => {
    registers[c] = registers[a] + registers[b];
  },
  addi: (a, b, c) => {
    registers[c] = registers[a] + b;
  },
  mulr: (a, b, c) => {
    registers[c] = registers[a] * registers[b];
  },
  muli: (a, b, c) => {
    registers[c] = registers[a] * b;
  },
  banr: (a, b, c) => {
    registers[c] = registers[a] & registers[b];
  },
  bani: (a, b, c) => {
    registers[c] = registers[a] & b;
  },
  borr: (a, b, c) => {
    registers[c] = registers[a] | registers[b];
  },
  bori: (a, b, c) => {
    registers[c] = registers[a] | b;
  },
  setr: (a, b, c) => {
    registers[c] = registers[a];
  },
  seti: (a, b, c) => {
    registers[c] = a;
  },
  gtir: (a, b, c) => {
    registers[c] = a > registers[b] ? 1 : 0;
  },
  gtri: (a, b, c) => {
    registers[c] = registers[a] > b ? 1 : 0;
  },
  gtrr: (a, b, c) => {
    registers[c] = registers[a] > registers[b] ? 1 : 0;
  },
  eqir: (a, b, c) => {
    registers[c] = a === registers[b] ? 1 : 0;
  },
  eqri: (a, b, c) => {
    registers[c] = registers[a] === b ? 1 : 0;
  },
  eqrr: (a, b, c) => {
    registers[c] = registers[a] === registers[b] ? 1 : 0;
  },
};

function parseToArray(line) {
  const items = line.split(': ')[1].replace('[', '').replace(']', '').split(', ');
  return items.map(utils.parseNum);
}

function getNumMatches(input) {
  const lines = input.split('\n');
  const start = parseToArray(lines[0]);
  const end = parseToArray(lines[2]);

  const instruction = lines[1].split(' ').map(utils.parseNum);

  const [opCode, a, b, c] = instruction;

  const matching = _.filter(ops, op => {
    registers = _.cloneDeep(start);
    op(a, b, c);
    return _.isEqual(registers, end);
  });

  return _.size(matching);
}

const IS_TEST = 0;

fs.readFile(IS_TEST ? 'test.txt' : 'in_1.txt', 'utf8', function(err, contents) {
  let ans;

  let input = contents.split('\n\n');

  ans = _.sumBy(input, item => getNumMatches(item) >= 3 ? 1 : 0);

  console.log('ans: ', ans);
});
