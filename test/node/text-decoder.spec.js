const {
  assert_equals,
} = require('../assert-package.js');

const { TextDecoder, TextEncoder } = require('../../dist/cjs/encoding');

describe('TextDecoder spec', () => {

  it('can be called with uint8 array or buffer', () => { 
    
    const expected = '0123456789';

    const encoded = new TextEncoder('utf-8').encode('0123456789');
    const decodedArray = new TextDecoder('utf-8').decode(encoded);
    const decodedBuffer = new TextDecoder('utf-8').decode(encoded.buffer);

    assert_equals(decodedArray, expected);
    assert_equals(decodedBuffer, expected);
  });

});