const BitmapHeader = require('./bitmap-header');
const PixelReader = require('../lib/pixel-reader');

class BitmapTransformer {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }
    
    transform(fn, callback) {
        
        const slicedBuffer = this.buffer.slice(this.header.pixelOffset);
    
        const reader = new PixelReader({ bitsPerPixel: this.header.bitsPerPixel });
        
        reader.on('color', (color) => {
            const { offset, b, g, r } = fn(color);
            slicedBuffer.writeUInt8(b, offset);
            slicedBuffer.writeUInt8(g, offset + 1);
            slicedBuffer.writeUInt8(r, offset + 2);
        
        });
        reader.on('end', () => {
            callback();
        });
        
        
        reader.read(slicedBuffer);        
    }
}

module.exports = BitmapTransformer;
