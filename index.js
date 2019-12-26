'use strict';

const { Transform, Readable } = require('stream');

module.exports = class ConcatStream extends Transform {
  constructor(inStreams) {
    super();

    if (!inStreams || !inStreams.length) throw new Error('invalid args');
    for (const inStream of inStreams) {
      if (!(inStream instanceof Readable)) throw new Error('not Readable instance');
    }

    const len = inStreams.length;
    let i = 0;
    const consumeInStreams = () => {
      const inStream = inStreams[i];
      if (i === len - 1) {
        inStream.pipe(this);
        return;
      }
      inStream.once('end', () => {
        ++i;
        consumeInStreams();
      })
      inStream.pipe(this, { end: false });
    };
    consumeInStreams();
  }

  _transform(chunk, encoding, callback) {
    callback(null, chunk);
  }
}
