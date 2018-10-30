const assert = require('assert');
const PixelReader = require('../lib/pixel-reader');

describe('Pixel Reader', () => {

    it('reads pixel from buffer', done => {
        const reader = new PixelReader({ bitsPerPixel: 24 });
        const colors = [];
        
        reader.on('color', color => {
            colors.push(color);
        });

        reader.on('end', () => {
          
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
        
        const buffer = Buffer.alloc(3 * 3); // for three pixels
  
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
    });
});
