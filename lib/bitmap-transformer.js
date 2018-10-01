const BitmapHeader = require('./bitmap-header');
const PixelReader = require('./pixel-reader');


class BitmapTransformer {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(fn, callback) {
        // this is a guide to what needs to happen, not a recipe

        // you have access to the data you need:
        // this.buffer
        // this.header.pixelOffset
        // this.header.bitsPerPixel
        // this.header.fileSize (not technically needed)
        // 1. Create a PixelReader and subscribe to "color" and "end" events
        // 2. Find the right place (offset) in the buffer from which to start your loop.
        //      HINT: use buffer.slice(offset) to create a "zero" based buffer you can pass to PixelReader
        let bitsPerPixel = this.header.bitsPerPixel;
        let reader = new PixelReader({ bitsPerPixel });
        let slicedBuffer = this.buffer.slice(this.header.pixelOffset);
    
        reader.on('color', color => {
            // 3. On the "color" event, 
            //      a. run the evented color through the supplied transform function `fn` to get the new color
            let { b, g, r, offset } = fn(color);

            slicedBuffer.writeUInt8(b, offset);
            slicedBuffer.writeUInt8(g, offset + 1);
            slicedBuffer.writeUInt8(r, offset + 2);

        });
        reader.on('end', () => {
            callback();
            //      b. write the new color values to the buffer using the `offset` property
            //         of the color. Remember to write to the "sliced" buffer!
        
            // 4. On the "end" event - Call the callback to indicate the transform is complete
            // 5. Call the "read" method passing in the sliced buffer 
        });
        
        reader.read(slicedBuffer);
    }
}

module.exports = { BitmapTransformer };
