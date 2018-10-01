function luminosity(image) {
    let weighted = parseInt((0.21 * image.r) + (0.72 * image.g) + (0.07 * image.b));
    image.r = weighted;
    image.g = weighted;
    image.b = weighted;
    return image;
}


module.exports = {
    luminosity
};
