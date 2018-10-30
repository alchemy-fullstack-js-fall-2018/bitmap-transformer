module.exports = function grayscale(pixel) {
    let val = (pixel.r + pixel.g + pixel.b) / 3;
    pixel.r = val;
    pixel.g = val;
    pixel.b = val;
    return pixel;
};
