const BitmapHeader = require('./bitmap-header');
const PixelReader = require('./pixel-reader');

module.exports = class BitmapTransformer {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(fn, callback) {
 
        let buffer = this.buffer;
        let pixelOffset = this.header.pixelOffset;
        let bitsPerPixel = this.header.bitsPerPixel;
        let reader = new PixelReader({ bitsPerPixel });
        let pixelSection = buffer.slice(pixelOffset);
  
        reader.on('color', color => {
        
            const { b, g, r } = fn(color);
            

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
