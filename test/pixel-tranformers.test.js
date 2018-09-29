const assert = require('assert');
const { invert, grayscale, redscale, sepia } = require('../lib/pixel-transformers');

describe('transformers', () => {

    it('invert', () => {
        
        const transformed = invert({
            r: 34,
            g: 100,
            b: 205
        });

        assert.deepEqual(transformed, {
            r: 221,
            g: 155,
            b: 50
        });
    });

    it('grayscale', () => {

        const transformed = grayscale({
            r: 34,
            g: 100,
            b: 205
        });

        assert.deepEqual(transformed, {
            r: 113,
            g: 113,
            b: 113
        });
    });

    it('redscale', () => {

        const transformed = redscale({
            r: 34,
            g: 100,
            b: 205
        });

        assert.deepEqual(transformed, {
            r: 255,
            g: 113,
            b: 0
        });
    });

    it('sepia', () => {

        const transformed = sepia({
            r: 34,
            g: 100,
            b: 205
        });

        assert.deepEqual(transformed, {
            r: 129,
            g: 114,
            b: 89
        });
    });

    
});
