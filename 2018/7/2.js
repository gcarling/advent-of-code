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

  let steps = [];

  roots.forEach(x => {
    available.push(x);
  });

  const NUM_WORKERS = 5;
  const BASE_SECONDS = 60;
  // const NUM_WORKERS = 2;
  // const BASE_SECONDS = 0;

  let workerTimes = _.times(NUM_WORKERS, () => 0);

  let time = -1;

  const finishedTimes = {};

  while ((_.size(steps) < _.size(all)) || _.sum(workerTimes) !== 0) {
    // update time / tickes
    time++;
    workerTimes = workerTimes.map(val => val === 0 ? 0 : val - 1);

    available.sort();

    let chosen = [];

    available.forEach(candidate => {
      if (_.includes(steps, candidate)) return;

      const val = candidate.charCodeAt(0) - 64;

      // if anything pointing to us isn't done yet, we abandon ship
      if (!_.every(maps, ({ to, from }) => {
        if (to !== candidate) return true;

        return finishedTimes[from] < time;
      })) {
        return;
      }

      // see if there's an open worker slot, if so add this and mark when it will be done
      for (let i = 0; i < NUM_WORKERS; i++) {
        if (workerTimes[i] === 0) {
          workerTimes[i] = BASE_SECONDS + val;
          chosen.push(candidate);
          finishedTimes[candidate] = workerTimes[i] + time-1;
          break;
        }
      }
    });

    for (let i = 0 ; i < _.size(chosen); i++) {
      available.shift();
      steps.push(chosen[i]);
    }

    maps.forEach(({ to, from }) => {
      if (!_.includes(steps, from)) return;
      if (_.includes(steps, to) || _.includes(available, to)) return;

      let valid = true;

      maps.forEach(another => {
        if (another.to !== to) return;

        if (!_.includes(steps, another.from)) {
          valid = false;
        }
      });

      if (valid) {
        available.push(to);
      }
    });
  }

  time += _.max(workerTimes);

  ans = time;

  console.log('ans: ', ans);
});
