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

            assert.deepEqual(colors[0], { offset: 0, b:0x00, g:0x00, r:0xFF });
            
            assert.deepEqual(colors[1], { offset: 3, b:0x00, g:0x80, r:0x00 });
           
            assert.deepEqual(colors[2], { offset: 6, b:0xFF, g:0x00, r:0x00 });
            done();
          
        });

      
        const buffer = new Buffer.alloc(24 * 3); 
        
        buffer.writeUInt8(0x00, 0);
        buffer.writeUInt8(0x00, 1);
        buffer.writeUInt8(0xFF, 2);

        buffer.writeUInt8(0x00, 3);
        buffer.writeUInt8(0x80, 4);
        buffer.writeUInt8(0x00, 5);

        buffer.writeUInt8(0xFF, 6);
        buffer.writeUInt8(0x00, 7);
        buffer.writeUInt8(0x00, 8);

        reader.read(buffer);
    });

});
