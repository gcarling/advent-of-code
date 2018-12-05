const _ = require('lodash');
const fs = require('fs');

 
fs.readFile('in.txt', 'utf8', function(err, contents) {
  let input = contents.replace('\n', '');
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
    console.log(_.size(input));
    break;
  }
});
