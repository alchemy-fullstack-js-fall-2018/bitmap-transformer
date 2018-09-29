const assert = require('assert');
const { readFileSync, writeFileSync } = require('fs');
const BitmapTransformer = require('../lib/bitmap-transformer');
const { invert, grayscale, redscale, sepia } = require('../lib/pixel-transformers');

/* eslint-disable-next-line no-unused-vars */
function sampler(test) {
    const bitmap = new BitmapTransformer(readFileSync('./test/pics/test-bitmap.bmp'));
    const path = `./test/pics/${test.name}-expected.bmp`;
    bitmap.transform(test, () => writeFileSync(path, bitmap.buffer));
}

describe('bitmap file transformer', () => {
    
    let buffer = null;
    beforeEach(() => {
        buffer = readFileSync('./test/pics/test-bitmap.bmp');
    });
    
    it('tests whole transform with invert', done => {

        const bitmap = new BitmapTransformer(buffer);

        bitmap.transform(invert, err => {
            if(err) return done(err);
            const expected = readFileSync('./test/pics/invert-expected.bmp');
            assert.deepEqual(bitmap.buffer, expected);
            done();
        });
    });

    it('tests whole transform with grayscale', done => {
        
        const bitmap = new BitmapTransformer(buffer);

        bitmap.transform(grayscale, err => {
            if(err) return done(err);
            const expected = readFileSync('./test/pics/grayscale-expected.bmp');
            assert.deepEqual(bitmap.buffer, expected);
            done();
        });
    });

    it('tests whole transform with redscale', done => {

        const bitmap = new BitmapTransformer(buffer);

        bitmap.transform(redscale, err => {
            if(err) return done(err);
            const expected = readFileSync('./test/pics/redscale-expected.bmp');
            assert.deepEqual(bitmap.buffer, expected);
            done();
        });
    });

    it('tests whole transform with sepia', done => {

        const bitmap = new BitmapTransformer(buffer);

        bitmap.transform(sepia, err => {
            if(err) return done(err);
            const expected = readFileSync('./test/pics/sepia-expected.bmp');
            assert.deepEqual(bitmap.buffer, expected);
            done();
        });
    });
});
