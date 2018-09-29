const assert = require('assert');
const PixelReader = require('../lib/pixel-reader');

describe('Pixel Reader', () => {

    it('reads pixel from buffer', done => {
        const reader = new PixelReader({ bitsPerPixel: 24 });
        const colors = [];

        reader.on('color', color => colors.push(color));

        reader.on('end', () => {
            assert.deepEqual(colors[0], { offset: 0, b: 0, g: 28, r: 56 });
            assert.deepEqual(colors[1], { offset: 3, b: 84, g: 112, r: 140 });
            assert.deepEqual(colors[2], { offset: 6, b: 168, g: 196, r: 224 });
            done();
        });

        const buffer = Buffer.alloc(24 * 3);
        for(let i = 0; i < 9; i++) buffer.writeUInt8(28 * i, i);
        
        reader.read(buffer);
    });

});

