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
            assert.deepEqual(colors[0], { offset: 0, b: 10, g: 100, r: 150 });
            done();
            assert.deepEqual(colors[1], { offset: 3, b: 200, g: 250, r: 50 });
            done();
            assert.deepEqual(colors[2], { offset: 6, b: 60, g: 70, r: 80 });
            done();
        });

        const buffer = Buffer.alloc(24 * 3); 

        buffer.writeUInt8(10, 0);
        buffer.writeUInt8(100, 1);
        buffer.writeUInt8(150, 2);
        buffer.writeUInt8(200, 3);
        buffer.writeUInt8(250, 4);
        buffer.writeUInt8(50, 5);
        buffer.writeUInt8(60, 6);
        buffer.writeUInt8(70, 7);
        buffer.writeUInt8(80, 8);

        reader.read(buffer);
    });

});
