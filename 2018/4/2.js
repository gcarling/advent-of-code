const _ = require('lodash');
const fs = require('fs');

 
fs.readFile('in.txt', 'utf8', function(err, contents) {
  const input = contents.split('\n');

  const unsorted = [];

  _.each(input, line => {
    if (!line) return;

    const split = line.split(']');

    const time = split[0].replace('[', '');

    unsorted.push({
      time,
      action: split[1].trim(),
    });

  });

  const events = unsorted.sort((event1, event2) => {
    const d1 = new Date(event1.time);
    const d2 = new Date(event2.time);

    return d1.getTime() - d2.getTime();
  });

  const guardMap = {};

  let currentGuard;
  let fellAsleepAt;

  function getMin(time) {
    return time.split(':')[1]
  }

  _.each(events, ({ action, time }) => {
    if (_.includes(action, 'begins shift')) {
      const guardID = action.split('#')[1].split(' ')[0];
      currentGuard = guardID;
      if (!guardMap[guardID]) {
        guardMap[guardID] = {};
      }
    }

    if (action === 'falls asleep') {
      fellAsleepAt = getMin(time);
    }

    if (action === 'wakes up') {
      // for each time they were asleep, inc
      for (let i = fellAsleepAt; i < getMin(time); i++) {
        if (guardMap[currentGuard][i]) {
          guardMap[currentGuard][i]++;
        } else {
          guardMap[currentGuard][i] = 1;
        }
      }
    }
  });

  let bestGuard;
  let bestTime;
  let bestForGuard = 0;


  _.each(_.keys(guardMap), currentGuard => {
    _.each(_.keys(guardMap[currentGuard]), time => {
      const val = guardMap[currentGuard][time];
  
      if (val > bestForGuard) {
        bestGuard = currentGuard;
        bestTime = time;
        bestForGuard = val;
      }
  
  
    });
  });
  
  const score = parseInt(bestTime);
  const ID = parseInt(bestGuard);

  console.log(score * ID);
});
