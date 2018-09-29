const EventEmitter = require('events');


module.exports = class PixelReader extends EventEmitter {
    constructor(options) {
        super();
        this.bitsPerPixel = options.bitsPerPixel;
        this.bytesPerPixel = options.bitsPerPixel / 8;
    }

    // for(let i = 0; i < buffer.length; i += this.bytesPerPixel) {

    // }

    // Keep in mind that the loop will need to "step" by number
    // of bytes based on this.bitsPerPixel (aka i steps by something other than 1).
    // Then inside the loop you can use i, i + 1, and i + 2 to get r, g, b for example

    read(buffer) {
        for(let i = 0; i < buffer.length; i += this.bytesPerPixel) {
            this.emit('color', {
                offset: i,
                b: buffer.readUInt8(i),
                g: buffer.readUInt8(i + 1),
                r: buffer.readUInt8(i + 2)
            });
        }
        this.emit('end');
    }
};

