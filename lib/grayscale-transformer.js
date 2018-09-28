function grayscale(color) {

    const gray = (color.b + color.g + color.r) / 3;
    console.log('color', color);

    return {
        r: gray,
        g: gray,
        b: gray
    };
    
}

module.exports = grayscale;
