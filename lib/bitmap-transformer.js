const BitmapHeader = require('./bitmap-header');
const PixelReader = require('./pixel-reader');

module.exports = class BitmapTransformer {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(fn, callback) {
        
        const reader = new PixelReader({ bitsPerPixel: this.header.bitsPerPixel });        
        const slicedBuffer = this.buffer.slice(this.header.pixelOffset);

        reader.on('color', color => {
            
            const { b, g, r } = fn(color);

            slicedBuffer.writeUInt8(b, color.offset);
            slicedBuffer.writeUInt8(g, color.offset + 1);
            slicedBuffer.writeUInt8(r, color.offset + 2);
        });

        reader.on('end', (err) => {
            callback(err);
        });

        reader.read(slicedBuffer);
    }
};
