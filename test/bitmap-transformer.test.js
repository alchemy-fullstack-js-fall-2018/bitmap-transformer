const assert = require('assert');
const { readFileSync } = require('fs');
const { BitmapTransformer } = require('../lib/bitmap-transformer');
const { invert } = require('../lib/invert-transformer');
const path = require('path');

describe('bitmap file transformer', () => {
    
    let buffer = null;
    let bitmapPath = path.join(__dirname, 'test-bitmap.bmp');
    beforeEach(() => {
        buffer = readFileSync(bitmapPath);
    });

    it('test whole transform', done => {
       
        const bitmap = new BitmapTransformer(buffer);

        bitmap.transform(invert, err => {
            if(err) return done(err);

            const expected = readFileSync('./test/inverted-expected.bmp');
            assert.deepEqual(bitmap.buffer, expected);
            done();
        });

    });
});
