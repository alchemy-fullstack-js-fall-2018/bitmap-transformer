function invert(color) {
    var newR = 255 - color.r;
    var newG = 255 - color.g;
    var newB = 255 - color.b;

    return { r: newR, g: newG, b: newB };
}
module.exports = { invert };  
