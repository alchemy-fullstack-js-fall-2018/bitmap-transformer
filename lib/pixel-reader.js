const EventEmitter = require('events');

class PixelReader extends EventEmitter {
    constructor(options) {
        super();
        this.bitsPerPixel = options.bitsPerPixel;
    }

    read(buffer) {
        for(let i = 0; i < buffer.length; i += this.bitsPerPixel) {
            const blue = buffer.readUInt8(i).toString(16);
            const green = buffer.readUInt8(i + 1).toString(16);
            const red = buffer.readUInt8(i + 2).toString(16);
            console.log(blue);
            console.log(green);
            console.log(red);
        };
        // Keep in mind that the loop will need to "step" by number
        // of bytes based on this.bitsPerPixel (aka i steps by something other than 1).
        // Then inside the loop you can use i, i + 1, and i + 2 to get r, g, b for exampl
    
    }
}
module.exports = PixelReader;
