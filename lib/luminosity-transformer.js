const luminosity = (obj) => {
    obj.r = 0.21 * obj.r;
    obj.g = 0.72 * obj.g;
    obj.b = (0.07 * obj.b).toFixed(2);
    return obj;
};
// Math.round(100*X)/100;
module.exports = luminosity;