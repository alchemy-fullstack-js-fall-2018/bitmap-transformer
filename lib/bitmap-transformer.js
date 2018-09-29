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
        // this is a guide to what needs to happen, not a recipe

        // you have access to the data you need:
        // this.buffer
        // this.header.pixelOffset
        // this.header.bitsPerPixel
        // this.header.fileSize (not technically needed)

        // 1. Create a PixelReader and subscribe to "color" and "end" events
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
        // 2. Find the right place (offset) in the buffer from which to start your loop.
        //      HINT: use buffer.slice(offset) to create a "zero" based buffer you can pass to PixelReader
        // 3. On the "color" event, 
        //      a. run the evented color through the supplied transform function `fn` to get the new color
        //      b. write the new color values to the buffer using the `offset` property
        //         of the color. Remember to write to the "sliced" buffer!
        // 4. On the "end" event - Call the callback to indicate the transform is complete
        // 5. Call the "read" method passing in the sliced buffer 

        
    }
};
