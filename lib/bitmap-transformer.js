const BitmapHeader = require('./bitmap-header');
const PixelReader = require('./pixel-reader');

module.exports = class BitmapTransform {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(fn, callback) {

        let buffer = this.buffer;
        let pixelOffset = this.header.pixelOffset;
        let bitsPerPixel = this.header.bitsPerPixel;
        let pixelSection = buffer.slice(pixelOffset);
        let reader = new PixelReader(bitsPerPixel);
        
        reader.on('color', color => {
            const { r, g, b } = fn(color);
            
            pixelSection.writeUInt8(b, color.offset);
            pixelSection.writeUInt8(g, color.offset + 1);
            pixelSection.writeUInt8(r, color.offset + 2);
        });

        reader.on('end', () => {
            callback();
        });

        reader.read(pixelSection);
        
    }
};
