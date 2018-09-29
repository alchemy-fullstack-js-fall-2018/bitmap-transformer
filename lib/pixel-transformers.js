
function invert(pixel) {

    pixel.r = 255 - pixel.r;
    pixel.g = 255 - pixel.g;
    pixel.b = 255 - pixel.b;

    return pixel;
}

function grayscale(pixel) {

    let sum = 0;
    for(let key in pixel) {
        if(key !== 'offset') {
            sum += pixel[key];
        }
    }
    const avg = Math.floor(sum / 3);
    
    pixel.r = avg;
    pixel.g = avg;
    pixel.b = avg;

    return pixel;
}

function redscale(pixel) {

    let sum = 0;
    for(let key in pixel) {
        if(key !== 'offset'){
            sum += pixel[key];
        }
    }
    
    const avg = Math.floor(sum / 3);
    
    pixel.r = 255;
    pixel.g = avg;
    pixel.b = 0;

    return pixel;
}

function sepia(pixel) {

    // https://www.techrepublic.com/blog/how-do-i/how-do-i-convert-images-to-grayscale-and-sepia-tone-using-c/

    const { r, g, b } = pixel;

    pixel.r = Math.floor((r * .393) + (g * .769) + (b * .189));
    pixel.g = Math.floor((r * .349) + (g * .686) + (b * .168));
    pixel.b = Math.floor((r * .272) + (g * .534) + (b * .131));

    return pixel;
}



module.exports = { 
    invert, 
    grayscale, 
    redscale,
    sepia
};
