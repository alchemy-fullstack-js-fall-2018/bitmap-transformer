const assert = require('assert');
const { readFileSync } = require('fs');
const BitmapTransformer = require('../lib/bitmap-transformer');
//const invert = require('../lib/invert-transform');

describe('bitmap file transformer', () => {
    
    let buffer = null;
    beforeEach(() => {
        // TODO: file read sync './test/test-bitmap.bmp' into buffer variable
    });

    // "pinning" test, or "snapshot" test
    it.skip('test whole transform', done => {
        // Use the BitmapTransformer class, 
        // passing in the buffer from the file read
        const bitmap = new BitmapTransformer(buffer);

        // Call .transform(), which will modify the buffer.
        // With this api, you pass in a transformation function (we are testing with "invert")
        bitmap.transform(invert, err => {
            if(err) return done(err);

            // After above step, the buffer has been modified
            // and is accessible via bitmap.buffer.
    
            // Read the output file we saved earlier as the "standard" expected output file.
            const expected = readFileSync('./test/inverted-expected.bmp')
            assert.deepEqual(bitmap.buffer, expected);
            done();

            // If you don't have a standard file yet, or need to update or are adding new test,
            // you can write it out by commenting above code block, and uncomment code below 
            // that writes the file and then visually inspect the file for correctness.
            // return fs.writeFileSync('./test/inverted-expected.bmp', bitmap.buffer);
        });

    });
});
