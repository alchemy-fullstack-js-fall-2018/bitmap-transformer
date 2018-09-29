const { 
    PIXEL_OFFSET, 
    BITS_PER_PIXEL_OFFSET, 
    FILE_SIZE_OFFSET 
} = require('../lib/bitmap-constants');

module.exports = class BitmapHeader {

    constructor(data) {
        this.pixelOffset = data.readUInt16LE(PIXEL_OFFSET);
        this.fileSize = data.readUInt32LE(FILE_SIZE_OFFSET);
        this.bitsPerPixel = data.readUInt16LE(BITS_PER_PIXEL_OFFSET);
    }

};
