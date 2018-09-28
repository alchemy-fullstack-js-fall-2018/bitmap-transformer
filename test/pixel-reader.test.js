const assert = require('assert');
const PixelReader = require('../lib/pixel-reader');

describe('Pixel Reader', () => {

    it('reads pixel from buffer', done => {
        const reader = new PixelReader({ bitsPerPixel: 24 });
        // TODO: subscribe to reader "color" event and push into `colors` array.
        // A "color" object should look like:
        // {
        //     offset: <offset from the start of buffer passed to PixelReader>,
        //     r: <red color value>,
        //     g: <green color value>,
        //     b: <blue color value>,
        // }
        
        const colors = [];
        reader.on('color', color => {
            colors.push(color);
        });


        reader.on('end', () => {
            // write deepEqual assertion for colors versus the
            // expected rgb color objects

            
            assert.deepEqual(colors[0], { offset: 0, b: 0, g: 0, r: 255 });
            assert.deepEqual(colors[1], { offset: 3, b: 0, g: 255, r: 0 });
            assert.deepEqual(colors[2], { offset: 6, b: 255, g: 0, r: 0 });
            
            done();
        });

        // Create a buffer with known data for your colors
        const buffer = Buffer.alloc(24 * 3); 
        buffer.writeInt8(0xFF, 0);
        buffer.writeInt8(0x00, 1);
        buffer.writeInt8(0x00, 2);

        buffer.writeInt8(0x00, 3);
        buffer.writeInt8(0xFF, 4);
        buffer.writeInt8(0x00, 5);

        buffer.writeInt8(0x00, 6);
        buffer.writeInt8(0x00, 7);
        buffer.writeInt8(0xFF, 8);


        
        // for three pixels
        // TODO: fill buffer with byte values that match your 
        // expected test colors

        // Call read method with your buffer
        reader.read(buffer);
    });

});
