module.exports = function invert(pixel) {
    //take an object with r, g, b
    //return object with same props but each value = (255 - val)
    pixel.r = 255 - pixel.r;
    pixel.g = 255 - pixel.g;
    pixel.b = 255 - pixel.b;
    return pixel;
};
