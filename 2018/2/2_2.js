const _ = require('lodash');
const fs = require('fs');

 
fs.readFile('in.txt', 'utf8', function(err, contents) {
  const input = contents.split('\n');

  _.each(input, str1 => {
    _.each(input, str2 => {
      if (!str1 || !str2) {
        return;
      }
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
