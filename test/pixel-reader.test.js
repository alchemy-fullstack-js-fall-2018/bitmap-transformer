const assert = require('assert');
const PixelReader = require('../lib/pixel-reader');

describe('Pixel Reader', () => {

    it('reads pixel from buffer', done => {
        const reader = new PixelReader({ bitsPerPixel: 24 });

        const purplePixel = { offset: 0, r: 127, g: 0, b: 255 };
        const yellowPixel = { offset: 3, r: 255, g: 255, b: 51 };
        const greenPixel = { offset: 6,  r: 102, g: 204, b: 0 };
        
        const colors = [];
        reader.on('color', (color) => {
            colors.push(color);
        });

        reader.on('end', () => {
            const expected = [purplePixel, yellowPixel, greenPixel];
            assert.deepEqual (colors, expected);
            done();
        });

        // Create a buffer with known data for your colors
        const buffer = Buffer.alloc(3 * 3); // allocate in BYTES, not BITS
        buffer.writeUInt8(purplePixel.b, 0);
        buffer.writeUInt8(purplePixel.g, 1);
        buffer.writeUInt8(purplePixel.r, 2);
        buffer.writeUInt8(yellowPixel.b, 3);
        buffer.writeUInt8(yellowPixel.g, 4);
        buffer.writeUInt8(yellowPixel.r, 5);
        buffer.writeUInt8(greenPixel.b, 6);
        buffer.writeUInt8(greenPixel.g, 7);
        buffer.writeUInt8(greenPixel.r, 8);

        // Call read method with your buffer
        reader.read(buffer);
    });

});
