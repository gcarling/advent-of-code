const _ = require('lodash');
const fs = require('fs');

const IS_TEST = 1;

let totalMetaData = 0;

function processNode(items) {
  const numChildren = parseInt(items[0]);
  const numMetadata = parseInt(items[1]);
  console.log('numC', numChildren);
  

  let inner = items.slice(2);

  // console.log('inner:', inner);
  let total = 0;
  
  for (let i = 0; i < numChildren; i++) {
    total += processNode(inner);
    inner = inner.slice(total);
  }

  const metaDataStart = total + 2;

  const metadata = items.slice(metaDataStart + 2, metaDataStart + 2 + numMetadata);

  console.log('meta:', metadata);

  totalMetaData += _.sum(_.map(metadata, m => parseInt(m, 10)));
  
  return metaDataStart + numMetadata;
}

fs.readFile(IS_TEST ? 'test.txt' : 'in.txt', 'utf8', function(err, contents) {
  let ans;

  let inputs = contents.replace('\n', '');

  const input = inputs.split(' ');

  processNode(input);

  ans = totalMetaData;

  console.log('ans: ', ans);
});
