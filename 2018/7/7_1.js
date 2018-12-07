const _ = require('lodash');
const fs = require('fs');

const IS_TEST = 0;

fs.readFile(IS_TEST ? 'test.txt' : 'in.txt', 'utf8', function(err, contents) {
  let ans;

  let input = contents.split('\n');
  input.pop();

  const maps = [];

  const all = new Set([]);

  input.forEach(line => {
    const split = line.split(' ');
    const from = split[1];
    const to = split[7];

    maps.push({ to, from });

    all.add(to);
    all.add(from);
  });

  const roots = new Set(all);

  maps.forEach(item => {
    const { to } = item;
    roots.delete(to);
  });

  const available = [];

  let output = [];

  roots.forEach(x => {
    available.push(x);
  });

  while (_.size(output) < _.size(all)) {
    available.sort();

    const next = available.shift();
    
    // did it already
    if (_.includes(output, next)) continue;

    output.push(next);

    maps.forEach(({ to, from }) => {
      if (next !== from) return;

      let valid = true;

      maps.forEach(another => {
        if (another.to !== to) return;

        if (!_.includes(output, another.from)) {
          valid = false;
        }
      });

      if (valid) available.push(to);
    });
  }

  ans = output.join('');

  console.log('ans: ', ans);
});
