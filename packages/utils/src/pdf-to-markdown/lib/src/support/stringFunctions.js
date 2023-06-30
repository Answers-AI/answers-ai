"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractEndingNumber = exports.extractNumbers = exports.filterOut = exports.filterOutWhitespaces = exports.filterOutDigits = exports.toCharcodes = exports.isDigit = exports.DASHS_CHAR_CODES = exports.PERIOD_CHAR_CODES = exports.MAX_DIGIT_CHAR_CODE = exports.MIN_DIGIT_CHAR_CODE = exports.WHITESPACE_CHAR_CODE = exports.TAB_CHAR_CODE = void 0;
const assert_1 = require("../assert");
exports.TAB_CHAR_CODE = 9;
exports.WHITESPACE_CHAR_CODE = 32;
exports.MIN_DIGIT_CHAR_CODE = 48;
exports.MAX_DIGIT_CHAR_CODE = 57;
exports.PERIOD_CHAR_CODES = [46, 190];
exports.DASHS_CHAR_CODES = [45, 189, 8211];
function isDigit(charCode) {
    return charCode >= exports.MIN_DIGIT_CHAR_CODE && charCode <= exports.MAX_DIGIT_CHAR_CODE;
}
exports.isDigit = isDigit;
function toCharcodes(text) {
    const codes = [];
    for (let index = 0; index < text.length; index++) {
        codes.push(text.charCodeAt(index));
    }
    return codes;
}
exports.toCharcodes = toCharcodes;
function filterOutDigits(text) {
    return String.fromCharCode(...toCharcodes(text).filter((code) => !isDigit(code)));
}
exports.filterOutDigits = filterOutDigits;
function filterOutWhitespaces(text) {
    return filterOut(text, [exports.TAB_CHAR_CODE, exports.WHITESPACE_CHAR_CODE]);
}
exports.filterOutWhitespaces = filterOutWhitespaces;
function filterOut(text, codes) {
    return String.fromCharCode(...toCharcodes(text).filter((code) => !codes.includes(code)));
}
exports.filterOut = filterOut;
function extractNumbers(text) {
    return (text.match(/\d+/g) || []).map(Number);
}
exports.extractNumbers = extractNumbers;
function extractEndingNumber(text) {
    const match = text.match(/\d+$/g);
    if (match) {
        assert_1.assert(match.length == 1, `Expected only one match, but got ${match}`);
        return Number(match[0]);
    }
    return undefined;
}
exports.extractEndingNumber = extractEndingNumber;
