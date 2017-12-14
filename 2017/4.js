const _ = require('lodash');
const fs = require('fs');

fs.readFile('./4_in.txt', 'utf8', (err, res) => {
  const input = res.split('\n');

  const ans1 = _.reduce(input, (sum, text, ind) => {
    if (text.length === 0) {
      return sum;
    }

    const row = text.split(' ');
    const uni = _.uniq(row);

    if (uni.length === row.length) return sum + 1;
    return sum;
  }, 0);

  function isAnagram(word1, word2) {
    const letterMap1 = {};
    
    _.each(word1, letter => {
      if (letterMap1[letter]) letterMap1[letter] = letterMap1[letter] + 1;
      else letterMap1[letter] = 1;
    });

    const letterMap2 = {};

    _.each(word2, letter => {
      if (letterMap2[letter]) letterMap2[letter] = letterMap2[letter] + 1;
      else letterMap2[letter] = 1;
    });

    return _.isEqual(letterMap1, letterMap2);
  }

  const ans2 = _.reduce(input, (sum, text, ind) => {
    if (text.length === 0) {
      return sum;
    }

    const row = text.split(' ');
    let isValid = true;
    
    _.each(row, (word1, i) => {
      _.each(row, (word2, j) => {
        // ignore if same word
        if (i === j) return;

        if (isAnagram(word1, word2)) {
          isValid = false;
        }
      });
    });

    if (isValid) return sum + 1;
    return sum;
  }, 0);

  console.log('ans2: ', ans2);

});

