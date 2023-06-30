"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemWithType = exports.getFontName = exports.joinText = exports.getText = exports.getHeight = void 0;
const assert_1 = require("../assert");
function get(item, name) {
    const value = item.data[name];
    assert_1.assertDefined(value, `No '${name}' defined in ${JSON.stringify(item)}`);
    return value;
}
function getHeight(item) {
    return get(item, 'height');
}
exports.getHeight = getHeight;
function getText(item) {
    return get(item, 'str');
}
exports.getText = getText;
function joinText(items, joinCharacter) {
    return items.map((item) => getText(item)).join(joinCharacter);
}
exports.joinText = joinText;
function getFontName(fontMap, item) {
    const fontId = item.data['fontName'];
    const fontObject = fontMap.get(fontId);
    if (!fontObject) {
        return fontId;
    }
    return assert_1.assertDefined(fontObject['name'], `No 'name' found in ${JSON.stringify(fontObject)}`);
}
exports.getFontName = getFontName;
function itemWithType(item, type) {
    const existingTypes = item.data['types'] || [];
    return item.withDataAddition({ types: [...existingTypes, type] });
}
exports.itemWithType = itemWithType;
