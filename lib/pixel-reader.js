const EventEmitter = require('events');

module.exports = class PixelReader extends EventEmitter {
    constructor(options) {
        super();
        this.bitsPerPixel = options.bitsPerPixel;
    }

    read(buffer) {
        console.log('buffer', buffer);
        for(let i = 0; i < buffer.length; i = i + 3) {
            const color = buffer.readUInt8(i);
            console.log('color', color);
            this.emit('color');
        }

        // Keep in mind that the loop will need to "step" by number
        // of bytes based on this.bitsPerPixel (aka i steps by something other than 1).
        // Then inside the loop you can use i, i + 1, and i + 2 to get r, g, b for example
    }
};
