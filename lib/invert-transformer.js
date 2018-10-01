function invert(image) {
    image.r = 255 - image.r;
    image.g = 255 - image.g;
    image.b = 255 - image.b;
    return image;
}


module.exports = {
    invert
};
