function grayscale(image) {
    let avr = ((image.r + image.g + image.b) / 3);
    image.r = avr;
    image.g = avr;
    image.b = avr;
    return image;
}


module.exports = {
    grayscale
};
