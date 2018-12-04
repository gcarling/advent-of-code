const _ = require('lodash');
const fs = require('fs');

 
fs.readFile('in.txt', 'utf8', function(err, contents) {
  const input = contents.split('\n');

  let numTwo = 0;
  let numThree = 0;

  // Part 1 1
  // _.each(input, str => {
  //   const counts = {};

  //   _.each(str.split(''), char => {
  //     if (counts[char]) {
  //       counts[char]++;
  //     } else {
  //       counts[char] = 1;
  //     }
  //   });

  //   console.log(str);
  //   console.log(counts);

  //   let got2 = false;
  //   let got3 = false;

  //   _.each(_.keys(counts), key => {
  //     if (counts[key] == 2 && !got2) {
  //       numTwo++;
  //       got2 = true;
  //     }
  //     if (counts[key] == 3 && !got3) {
  //       numThree++;
  //       got3 = true;
  //     }
  //   });
  // });

  _.each(input, str1 => {
    _.each(input, str2 => {
      if (!str1 || !str2) {
        return;
      }
      // console.log(str1);
      if (_.size(str1 )!= _.size(str2)) {
        return;
      }

      let same = '';

      for (let i = 0; i < _.size(str1); i++) {
        if (str1.charAt(i) === str2.charAt(i)) {
          same += str1.charAt(i);
        }
      }

      if (_.size(same) == _.size(str1) - 1) {
        console.log(same);
        process.exit(1);
      }
    });
  });


});
