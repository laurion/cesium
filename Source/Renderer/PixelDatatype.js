/*global define*/
define(['../Core/Enumeration'], function(Enumeration) {
    "use strict";

    /**
     * DOC_TBA
     *
     * @exports PixelDatatype
     */
    var PixelDatatype = {
        /**
         * DOC_TBA
         *
         * @constant
         * @type {Enumeration}
         */
        UNSIGNED_BYTE : new Enumeration(0x1401, 'UNSIGNED_BYTE'),

        /**
         * An unsigned short pixel datatype used for depth textures with 16-bit depth values.
         *
         * @constant
         * @type {Enumeration}
         */
        UNSIGNED_SHORT : new Enumeration(0x1403, 'UNSIGNED_SHORT'),

        /**
         * An unsigned int pixel datatype used for depth textures with 32-bit depth values.
         *
         * @constant
         * @type {Enumeration}
         */
        UNSIGNED_INT : new Enumeration(0x1405, 'UNSIGNED_INT'),

        /**
         * An unsigned int pixel datatype used for depth-stencil textures with 24-bit depth and 8-bit stencil values.
         *
         * @constant
         * @type {Enumeration}
         */
        UNSIGNED_INT_24_8_WEBGL : new Enumeration(0x84FA, 'UNSIGNED_INT_24_8_WEBGL'),

        /**
         * DOC_TBA
         *
         * @constant
         * @type {Enumeration}
         */
        UNSIGNED_SHORT_4_4_4_4 : new Enumeration(0x8033, 'UNSIGNED_SHORT_4_4_4_4'),

        /**
         * DOC_TBA
         *
         * @constant
         * @type {Enumeration}
         */
        UNSIGNED_SHORT_5_5_5_1 : new Enumeration(0x8034, 'UNSIGNED_SHORT_5_5_5_1'),

        /**
         * DOC_TBA
         *
         * @constant
         * @type {Enumeration}
         */
        UNSIGNED_SHORT_5_6_5 : new Enumeration(0x8363, 'UNSIGNED_SHORT_5_6_5'),

        /**
         * DOC_TBA
         *
         * @param pixelDatatype
         *
         * @returns {Boolean}
         */
        validate : function(pixelDatatype) {
            return ((pixelDatatype === PixelDatatype.UNSIGNED_BYTE) ||
                    (pixelDatatype === PixelDatatype.UNSIGNED_SHORT) ||
                    (pixelDatatype === PixelDatatype.UNSIGNED_INT) ||
                    (pixelDatatype === PixelDatatype.UNSIGNED_INT_24_8_WEBGL) ||
                    (pixelDatatype === PixelDatatype.UNSIGNED_SHORT_4_4_4_4) ||
                    (pixelDatatype === PixelDatatype.UNSIGNED_SHORT_5_5_5_1) ||
                    (pixelDatatype === PixelDatatype.UNSIGNED_SHORT_5_6_5));
        }
    };

    return PixelDatatype;
});