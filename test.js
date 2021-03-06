'use strict';

const fs = require('fs');
const ConcatStream = require('.');

const stream1 = fs.createReadStream('package.json');
const stream2 = fs.createReadStream('index.js');
const stream3 = fs.createReadStream('test.js');

const combinedStream = new ConcatStream([stream1, stream2, stream3]);
combinedStream.once('finish', () => {
  console.info('combinedStream finished');
});
combinedStream.pipe(process.stdout);
