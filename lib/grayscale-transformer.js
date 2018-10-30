
const grayscale = (obj) => {
    const average = (obj.r + obj.g + obj.b) / 3;
    obj.r = average;
    obj.g = average;
    obj.b = average;
    return obj;
};

module.exports = grayscale;
