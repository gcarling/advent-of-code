const _ = require('lodash');
const fs = require('fs');

function react(str) {
  let input = str;

  while (true) {
    const toRemove = [];
    for (let i = 0; i < _.size(input)-1; i++) {
      const char1 = input.charAt(i);
      const char2 = input.charAt(i+1);
  
      if (char1.toLowerCase() === char2.toLowerCase() && char1 !== char2) {
        toRemove.push(char1 + char2);
        i++;
      }
    }
    if (_.size(toRemove) > 0) {
      toRemove.forEach(str => {
        input = input.replace(str, '');
      });
      continue;
    }
    return input;
  }
}

 
fs.readFile('in.txt', 'utf8', function(err, contents) {
  let input = contents.replace('\n', '');
  
  const set = new Set([]);

  
  _.each(input, char => {
    set.add(char.toLowerCase());
  });

  let best = 999999;

  set.forEach(char => {
    const without = input.split(char).join('').split(char.toUpperCase()).join('');

    const out = react(without)

    const score = _.size(out);

    if (score < best) {
      best = score;
    }
  });

  console.log(best);
});
