function invert(image) {
    image.r = 255 - 34;
    image.g = 255 - 100;
    image.b = 255 - 205;
    return image;
}


module.exports = {
    invert
};
