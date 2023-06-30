"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAGE_MAPPING = exports.MOST_USED_HEIGHT = exports.MAX_HEIGHT = exports.MAX_Y = exports.MIN_Y = exports.MAX_X = exports.MIN_X = void 0;
const ItemTransformer_1 = require("./ItemTransformer");
const FontType_1 = require("../FontType");
const GlobalDefinition_1 = require("../GlobalDefinition");
const PageMapping_1 = require("../PageMapping");
const PageFactorFinder_1 = require("../support/PageFactorFinder");
const groupingUtils_1 = require("../support/groupingUtils");
const functional_1 = require("../support/functional");
const stringFunctions_1 = require("../support/stringFunctions");
const simple_statistics_1 = require("simple-statistics");
exports.MIN_X = new GlobalDefinition_1.default('minX');
exports.MAX_X = new GlobalDefinition_1.default('maxX');
exports.MIN_Y = new GlobalDefinition_1.default('minY');
exports.MAX_Y = new GlobalDefinition_1.default('maxY');
exports.MAX_HEIGHT = new GlobalDefinition_1.default('maxHeight');
exports.MOST_USED_HEIGHT = new GlobalDefinition_1.default('mostUsedHeight');
exports.PAGE_MAPPING = new GlobalDefinition_1.default('pageMapping');
const config = {
    // how much distance to min/max/x/y can an item have in order to be considered fringe
    maxDistanceToFringe: 50,
};
class CalculateStatistics extends ItemTransformer_1.default {
    constructor() {
        super('Calculate Statistics', 'Calculate global statistics that are used in downstream transformers', {
            requireColumns: ['str', 'fontName', 'y', 'height'],
            producesGlobels: [
                'mostUsedHeight',
                'mostUsedFont',
                'mostUsedDistance',
                'maxHeight',
                'maxHeightFont',
                'fontToFormats',
            ],
            debug: {
                showAll: true,
            },
        });
    }
    transform(context, items) {
        const heights = items.map((item) => item.data['height']);
        const mostUsedByMedian = simple_statistics_1.median(heights);
        // const heightToOccurrence: { [key: string]: number } = {};
        const heightToOccurrence = {};
        const fontToOccurrence = {};
        let maxHeight = 0;
        let maxHeightFont;
        let minX = 999;
        let maxX = 0;
        let minY = 999;
        let maxY = 0;
        items.forEach((item) => {
            const itemHeight = item.data['height'];
            const itemFont = item.data['fontName'];
            const x = item.data['x'];
            const y = item.data['y'];
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
            heightToOccurrence[itemHeight] = heightToOccurrence[itemHeight] ? heightToOccurrence[itemHeight] + 1 : 1;
            fontToOccurrence[itemFont] = fontToOccurrence[itemFont] ? fontToOccurrence[itemFont] + 1 : 1;
            if (itemHeight > maxHeight) {
                maxHeight = itemHeight;
                maxHeightFont = itemFont;
            }
        });
        // TODO really need parseInt here ?
        const mostUsedHeight = parseInt(getMostUsedKey(heightToOccurrence));
        const mostUsedFont = getMostUsedKey(fontToOccurrence);
        const groupedByPage = groupingUtils_1.groupByPage(items);
        const pageMapping = parsePageMapping(groupedByPage, minX, maxX, minY, maxY);
        // Parse line distances
        const distanceToOccurrence = {};
        let page = -1;
        let lastItemOfMostUsedHeight;
        items.forEach((item) => {
            if (item.page !== page)
                lastItemOfMostUsedHeight = undefined;
            const itemHeight = item.data['height'];
            const itemText = item.data['str'];
            const itemY = item.data['y'];
            if (itemHeight == mostUsedHeight && itemText.trim().length > 0) {
                if (lastItemOfMostUsedHeight && itemY != lastItemOfMostUsedHeight.data['y']) {
                    const distance = lastItemOfMostUsedHeight.data['y'] - itemY;
                    if (distance > 0) {
                        distanceToOccurrence[distance] = distanceToOccurrence[distance] ? distanceToOccurrence[distance] + 1 : 1;
                    }
                }
                lastItemOfMostUsedHeight = item;
            }
            else {
                lastItemOfMostUsedHeight = undefined;
            }
            page = item.page;
        });
        // const mostUsedDistance = parseInt(getMostUsedKey(distanceToOccurrence));
        const fontIdToName = [];
        const fontToType = new Map();
        context.fontMap.forEach(function (value, key) {
            const fontName = value['name'];
            fontIdToName.push(`${key}  = ${fontName}`);
            const formatType = getFormatType(key, fontName, mostUsedFont, maxHeightFont);
            if (formatType) {
                fontToType.set(key, formatType);
            }
        });
        fontIdToName.sort();
        return {
            items: items,
            globals: [
                exports.MAX_HEIGHT.value(maxHeight),
                exports.MOST_USED_HEIGHT.value(mostUsedByMedian),
                exports.MIN_X.value(minX),
                exports.MAX_X.value(maxX),
                exports.MIN_Y.value(minY),
                exports.MAX_Y.value(maxY),
                exports.PAGE_MAPPING.value(pageMapping),
            ],
            // globals2: {
            //   mostUsedHeight: mostUsedHeight,
            //   mostUsedFont: mostUsedFont,
            //   mostUsedDistance: mostUsedDistance,
            //   maxHeightFont: maxHeightFont,
            //   fontToFormats: fontToType,
            // },
            messages: [
                'Items per height: ' + JSON.stringify(heightToOccurrence),
                'Items per font: ' + JSON.stringify(fontToOccurrence),
                'Items per distance: ' + JSON.stringify(distanceToOccurrence),
                'Fonts:' + JSON.stringify(fontIdToName),
            ],
        };
    }
}
exports.default = CalculateStatistics;
function parsePageMapping(groupedByPage, minX, maxX, minY, maxY) {
    const pageFactor = new PageFactorFinder_1.default().find(groupedByPage, (items) => ({
        index: items[0].page,
        numbers: possiblePageNumbers(items.filter((item) => {
            const x = item.data['x'];
            const y = item.data['y'];
            return (x <= minX + config.maxDistanceToFringe ||
                x >= maxX - config.maxDistanceToFringe ||
                y <= minY + config.maxDistanceToFringe ||
                y >= maxY - config.maxDistanceToFringe);
        })),
    }), { sampleCount: 20, minFulfillment: 0.8 });
    return typeof pageFactor === 'undefined' ? new PageMapping_1.default() : new PageMapping_1.default(pageFactor, true);
}
function getMostUsedKey(keyToOccurrence) {
    var maxOccurence = 0;
    var maxKey;
    Object.keys(keyToOccurrence).map((element) => {
        if (!maxKey || keyToOccurrence[element] > maxOccurence) {
            maxOccurence = keyToOccurrence[element];
            maxKey = element;
        }
    });
    return maxKey;
}
function getFormatType(fontId, fontName, mostUsedFont, maxHeightFont) {
    const fontNameLowerCase = fontName.toLowerCase();
    if (fontId == mostUsedFont) {
        return undefined;
    }
    else if (fontNameLowerCase.includes('bold') &&
        (fontNameLowerCase.includes('oblique') || fontNameLowerCase.includes('italic'))) {
        return FontType_1.default.BOLD_OBLIQUE;
    }
    else if (fontNameLowerCase.includes('bold')) {
        return FontType_1.default.BOLD;
    }
    else if (fontNameLowerCase.includes('oblique') || fontNameLowerCase.includes('italic')) {
        return FontType_1.default.OBLIQUE;
    }
    else if (fontId === maxHeightFont) {
        //TODO this was the wrong comparision in old app and thus never returned as bold probably
        return FontType_1.default.BOLD;
    }
}
function possiblePageNumbers(items) {
    return functional_1.flatten(items.map((item) => {
        return (stringFunctions_1.extractNumbers(item.data['str'])
            .filter((number) => number >= 0)
            // .filter((number) => number <= line.page + 1)
            .filter(groupingUtils_1.onlyUniques));
    }));
}
