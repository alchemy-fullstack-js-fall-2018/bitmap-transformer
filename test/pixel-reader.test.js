const assert = require('assert');
const PixelReader = require('../lib/pixel-reader');

describe('Pixel Reader', () => {

    it('reads pixel from buffer', done => {
        const reader = new PixelReader({ bitsPerPixel: 24 });
        const colors = [];
        
        reader.on('color', color => {
            colors.push(color);
            // console.log(colors);
        });

        // TODONE: subscribe to reader "color" event and push into `colors` array.
        // A "color" object should look like:
        // {
        //     offset: <offset from the start of buffer passed to PixelReader>,
        //     r: <red color value>,
        //     g: <green color value>,
        //     b: <blue color value>,
        // }
        reader.on('end', () => {
            // write deepEqual assertion for colors versus the
            // expected rgb color objects
            // Don't forget to call done()!
            assert.deepEqual(colors, [{
                offset: 0,
                b: 128,
                g: 128,
                r: 0
            }, {
                offset: 3,
                b: 255,
                g: 0,
                r: 255
            }, {
                offset: 6,
                b: 0,
                g: 255,
                r: 127
            }           
            ]);
        });
        done(); 
        
        // Create a buffer with known data for your colors
        const buffer = Buffer.alloc(3 * 3); // for three pixels
        // TODO: fill buffer with byte values that match your 
        // expected test colors

        // Call read method with your buffer
        //this color is teal//
        buffer.writeUInt8(0x80, 0);
        buffer.writeUInt8(0x80, 1);
        buffer.writeUInt8(0x00, 2);
        //this color is magenta//
        buffer.writeUInt8(0xFF, 3);
        buffer.writeUInt8(0x00, 4);
        buffer.writeUInt8(0xFF, 5);
        //this color is chartreuse//
        buffer.writeUInt8(0x00, 6);
        buffer.writeUInt8(0xFF, 7);
        buffer.writeUInt8(0x7F, 8);
        reader.read(buffer);
        console.log(buffer);
    });
});
