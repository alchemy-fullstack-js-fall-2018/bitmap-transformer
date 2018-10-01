const BitmapHeader = require('./bitmap-header');
const PixelReader = require('./pixel-reader');


class BitmapTransformer {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(fn, callback) {

        let bitsPerPixel = this.header.bitsPerPixel;
        let reader = new PixelReader({ bitsPerPixel });
        let slicedBuffer = this.buffer.slice(this.header.pixelOffset);
    
        reader.on('color', color => {
          
            let { b, g, r, offset } = fn(color);

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

module.exports = { BitmapTransformer };
