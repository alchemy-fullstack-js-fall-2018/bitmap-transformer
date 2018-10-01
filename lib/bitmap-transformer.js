const BitmapHeader = require('./bitmap-header');
const PixelReader = require('./pixel-reader');

module.exports = class BitmapTransform {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(fn, callback) {
        const reader = new PixelReader({ bitsPerPixel: this.header.bitsPerPixel });
        const slicedBuffer = this.buffer.slice(this.header.pixelOffset);

        reader.on('color', (color) => {
            let transformedColor = fn(color);
            slicedBuffer.writeUInt8(transformedColor.b, color.offset);
            slicedBuffer.writeUInt8(transformedColor.g, color.offset + 1);
            slicedBuffer.writeUInt8(transformedColor.r, color.offset + 2);
        });
        reader.on('end', () => {
            callback();
        });

        reader.read(slicedBuffer); 
    }
};