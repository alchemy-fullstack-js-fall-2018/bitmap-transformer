const EventEmiter = require('events');

module.export = class PixelReader extends EventEmitter {
    constructor(options) {
        super();
        this.bitsPerPixel = options.bitsPerPixel;
    }
}

    read(buffer) {
        for(let i = 0; i < this.buffer.length; i++ );
            const pixel = {
                b: this.buffer.readUInt8(i),
                g: this.buffer.readUInt8(i + 1),
                r: this.buffer.readUInt8(i + 2)
            };
        // Keep in mind that the loop will need to "step" by number
        // of bytes based on this.bitsPerPixel (aka i steps by something other than 1).
        // Then inside the loop you can use i, i + 1, and i + 2 to get r, g, b for example
    }


