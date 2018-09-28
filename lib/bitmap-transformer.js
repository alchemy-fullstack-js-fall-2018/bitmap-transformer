const BitmapHeader = require('./bitmap-header');

class BitmapTransform {
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


        // BUFFER COLOR OFFSET = BITMAP HEADER (112) + DIB HEADER (40) === 152 (SOMETIMES + ANOTHER 12)

        // class PixelReader {
        //     constructor(color, end) {
        //         this.color = color;
        //         this.end = end;
        //     }
            
        // }
        // const start = this.buffer.slice(152);
         
        // 1. Create a PixelReader and subscribe to "color" and "end" events
        // 2. Find the right place (offset) in the buffer from which to start your loop.
        //      HINT: use buffer.slice(offset) to create a "zero" based buffer you can pass to PixelReader
        // 3. On the "color" event, 
        //      a. run the evented color through the supplied transform function `fn` to get the new color
        //      b. write the new color values to the buffer using the `offset` property
        //         of the color. Remember to write to the "sliced" buffer!
        // 4. On the "end" event - Call the callback to indicate the transform is complete
        // 5. Call the "read" method passing in the sliced buffer 

        
    }
}
