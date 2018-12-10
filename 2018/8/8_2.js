const _ = require('lodash');
const fs = require('fs');

const IS_TEST = 0;

function processNode(items) {
  const numChildren = parseInt(items[0], 10);
  const numMetadata = parseInt(items[1], 10);

  if (isNaN(numChildren)) console.log(items[0]);

  let inner = items.slice(2);

  let total = 0;

  const children = [];
  
  for (let i = 0; i < numChildren; i++) {
    const [child, len] = processNode(inner);
    total += len;
    children.push(child);
    inner = inner.slice(len);
  }

  const metadata = inner.slice(0, numMetadata).map(m => parseInt(m, 10));

  const node = {
    metadata,
    children,
  };

  return [node, 2 + total + numMetadata];
}

function getNodeValue(node) {
  if (_.isEmpty(node.children)) {
    return _.sum(node.metadata);
  }

  return _.sumBy(node.metadata, metadata => {
    const child = node.children[metadata-1];
    if (child) {
      return getNodeValue(child);
    }
    return 0;
  });
}

fs.readFile(IS_TEST ? 'test.txt' : 'in.txt', 'utf8', function(err, contents) {
  let ans;

  let inputs = contents.replace('\n', '');
  const input = inputs.split(' ');

  const [root, totalSize] = processNode(input);

  ans = getNodeValue(root);

  console.log('ans: ', ans);
});
