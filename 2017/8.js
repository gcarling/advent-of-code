const _ = require('lodash');
const fs = require('fs');


fs.readFile('./8_in.txt', 'utf8', (err, res) => {
  const inputLines = res.split('\n');

  function getRegisterVal(registers, key) {
    if (_.has(registers, key)) return registers[key];
    return 0;
  }

  let globalMax;

  const registerValues = _.reduce(inputLines, (registers, input) => {
    if (_.isEmpty(input)) return registers;

    const split = input.split(' ');
    const regToSet = split[0];
    const shouldInc = split[1] === 'inc';
    const delta = _.toNumber(split[2]);
    const regToCheck = split[4];
    const checkOp = split[5];
    const compareVal = _.toNumber(split[6]);

    const registerVal = getRegisterVal(registers, regToCheck);

    const checkPasses = (() => {
      switch(checkOp) {
        case '>': return registerVal > compareVal;
        case '<': return registerVal < compareVal;
        case '<=': return registerVal <= compareVal;
        case '==': return registerVal === compareVal;
        case '>=': return registerVal >= compareVal;
        case '!=': return registerVal !== compareVal;
        console.log('UNKNOWN OP: ', checkOp);
      }
    })();

    if (!checkPasses) return registers;

    const existingValue = getRegisterVal(registers, regToSet);

    const newVal = shouldInc ? existingValue + delta : existingValue - delta;

    globalMax = _.max([newVal, globalMax]);

    return {
      ...registers,
      [regToSet]: newVal,
    };
  }, {});

  // console.log('registerValues: ', registerValues);

  const maxReg = _.maxBy(_.keys(registerValues), k => registerValues[k]);

  console.log('max: ', registerValues[maxReg]);
  console.log('globalMax: ', globalMax);
});
