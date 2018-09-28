const assert = require('assert');
const PixelReader = require('../lib/pixel-reader');

describe('Pixel Reader', () => {

    it('reads pixel from buffer', done => {
        const reader = new PixelReader({ bitsPerPixel: 24 });
        
        const colors = [];

        reader.on('color', color => {
            const { offset, b, g, r } = color;
            colors.push({
                offset: offset,
                b: b,
                g: g,
                r: r
            });
        });

        // TODO: subscribe to reader "color" event and push into `colors` array.
        // A "color" object should look like:
        // {
        //     offset: <offset from the start of buffer passed to PixelReader>,
        //     r: <red color value>,
        //     g: <green color value>,
        //     b: <blue color value>,
        // }

        reader.on('end', () => {
            assert.deepEqual(colors[0], { offset: 0, b: 116, g: 63, r: 63 });
            done();
            // write deepEqual assertion for colors versus the
            // expected rgb color objects

            // Don't forget to call done()!
        });

        // Create a buffer with known data for your colors
        const buffer = Buffer.alloc(24 * 3); // for three pixels
        // TODO: fill buffer with byte values that match your 
        // expected test colors
        buffer.writeInt8(116, 0);
        buffer.writeInt8(63, 8);
        buffer.writeInt8(63, 16);

        // Call read method with your buffer
        reader.read(buffer);
    });

});
