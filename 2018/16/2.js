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

const possibleMatchings = _.mapValues(ops, () => []);

function parseToArray(line) {
  const items = line.split(': ')[1].replace('[', '').replace(']', '').split(', ');
  return items.map(utils.parseNum);
}

function checkMatches(input) {
  const lines = input.split('\n');
  const start = parseToArray(lines[0]);
  const end = parseToArray(lines[2]);

  const instruction = lines[1].split(' ').map(utils.parseNum);

  const [opCode, a, b, c] = instruction;

  _.each(ops, (op, name) => {
    registers = _.cloneDeep(start);
    op(a, b, c);
    const eq = _.isEqual(registers, end);

    if (!eq) {
      possibleMatchings[name] = _.reject(possibleMatchings[name], code => code === opCode);
    } else {
      if (!_.includes(possibleMatchings[name], opCode)) {
        possibleMatchings[name].push(opCode);
      }
    }
  });
}

function getFinalMatchings() {
  const finalMappings = {};
  const handled = new Set([]);

  let tempMatchings = possibleMatchings;
  
  for (let i = 0; i < 16; i++) {
    const cur = _.findKey(tempMatchings, (value, key) => {
      return !handled.has(key) && _.size(value) === 1;
    });

    const mappedVal = _.first(tempMatchings[cur])

    finalMappings[cur] = mappedVal;
    handled.add(cur);
    
    tempMatchings = _.mapValues(tempMatchings, (value, key) => {
      if (key === cur) return value;

      return _.reject(value, v => v === mappedVal);
    });
  }

  return finalMappings;
}

function getFuncForCode(opCode, matchings) {
  const funcName = _.findKey(matchings, value => value === opCode);
  return ops[funcName];
}

function processInstructionLine(line, matchings) {
  const instr = line.split(' ').map(utils.parseNum);
  const [opCode, a, b, c] = instr;
  getFuncForCode(opCode, matchings)(a, b, c);
}

const IS_TEST = 0;

fs.readFile(IS_TEST ? 'test.txt' : 'in_1.txt', 'utf8', function(err, contents) {
  let ans;

  let input = contents.split('\n\n');

  _.each(input, item => checkMatches(item));

  const matchings = getFinalMatchings();

  fs.readFile(IS_TEST ? 'test.txt' : 'in_2.txt', 'utf8', function(err, contents2) {
    input = contents2.split('\n');
    input.pop();

    registers = [0, 0, 0, 0];

    _.each(input, line => processInstructionLine(line, matchings));

    ans = registers[0];

    console.log('ans: ', ans);

  });
});
