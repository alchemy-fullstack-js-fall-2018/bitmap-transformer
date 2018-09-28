const assert = require('assert');
const PixelReader = require('../lib/pixel-reader');

describe('Pixel Reader', () => {

    it('reads pixel from buffer', done => {
        const reader = new PixelReader({ bitsPerPixel: 24 });
        
        const colors = [];

        reader.on('color', color => {
            colors.push(color);
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
            assert.deepEqual(colors[0], { offset: 0, b: 10, g: 100, r: 150 });
            done();
            assert.deepEqual(colors[1], { offset: 3, b: 200, g: 250, r: 50 });
            done();
            assert.deepEqual(colors[2], { offset: 6, b: 60, g: 70, r: 80 });
            done();
            // write deepEqual assertion for colors versus the
            // expected rgb color objects

            // Don't forget to call done()!
        });

        // Create a buffer with known data for your colors
        const buffer = Buffer.alloc(24 * 3); // for three pixels
        // TODO: fill buffer with byte values that match your 
        // expected test colors
        buffer.writeUInt8(10, 0);
        buffer.writeUInt8(100, 1);
        buffer.writeUInt8(150, 2);
        buffer.writeUInt8(200, 3);
        buffer.writeUInt8(250, 4);
        buffer.writeUInt8(50, 5);
        buffer.writeUInt8(60, 6);
        buffer.writeUInt8(70, 7);
        buffer.writeUInt8(80, 8);

        console.log('test buffer', buffer);

        // Call read method with your buffer
        reader.read(buffer);
    });

});
