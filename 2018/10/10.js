const _ = require('lodash');
const fs = require('fs');
const input = require('./input');

const IS_TEST = 0;

let ans;

const points = [];

input.split('\n').forEach(line => {
  console.log('line: ', line);
  if (_.isEmpty(line)) return;

  const split = line.split('>');

  const position = split[0].split('<')[1].split(', ');

  const startX = parseInt(position[0].trim(), 10);
  const startY = parseInt(position[1].trim(), 10);

  const velocity = split[1].split('<')[1].split(', ');

  const velocityX = parseInt(velocity[0].trim(), 10);
  const velocityY = parseInt(velocity[1].trim(), 10);

  points.push({
    startX,
    startY,
    velocityX,
    velocityY,
  });
});  

console.log('points: ', points);

// console.log('ans: ', ans);
