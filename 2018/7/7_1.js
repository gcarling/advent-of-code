const _ = require('lodash');
const fs = require('fs');

const IS_TEST = 0;

fs.readFile(IS_TEST ? 'test.txt' : 'in.txt', 'utf8', function(err, contents) {
  let ans;

  let input = contents.split('\n');
  input.pop();

  const mapping = {};

  const all = new Set([]);

  input.forEach(line => {
    const split = line.split(' ');
    const from = split[1];
    const to = split[7];

    if (mapping[from]) {
      mapping[from].push(to);
    } else {
      mapping[from] = [to];
    }

    all.add(to);
    all.add(from);
  });

  const output = [];

  function getAvailable(mapping, output) {
    return _.filter(Array.from(all), loc => {
      if (_.includes(output, loc)) return false;

      return _.every(mapping, (to, from) => {
        if (_.includes(to, loc) && !_.includes(output, from)) {
          return false;
        }
        return true;
      });
    });
  }

  while (_.size(output) < _.size(all)) {
    const available = getAvailable(mapping, output);
    available.sort();
    output.push(available[0]);
  }

  ans = output.join('');

  console.log('ans: ', ans);
});
