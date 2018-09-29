const EventEmitter = require('events');

module.exports = class PixelReader extends EventEmitter {
    constructor(options) {
        super();
        this.bitsPerPixel = options.bitsPerPixel;
    }

    read(buffer) {
        for(let i = 0; i < buffer.length; i = i + 3) {
            const blue = buffer.readUInt8(i);
            const green = buffer.readUInt8(i + 1);
            const red = buffer.readUInt8(i + 2);
            
            this.emit('color', {
                offset: i,
                b: blue,
                g: green,
                r: red
            });
        }

        this.emit('end');
    }
};
