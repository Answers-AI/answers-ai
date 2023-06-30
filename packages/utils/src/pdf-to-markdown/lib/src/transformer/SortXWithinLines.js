"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ItemTransformer_1 = require("./ItemTransformer");
const LineItemMerger_1 = require("../debug/LineItemMerger");
const groupingUtils_1 = require("../support/groupingUtils");
class SortXWithinLines extends ItemTransformer_1.default {
    constructor() {
        super('Sort by X', 'Sorts the items of a line by the x coordinate', {
            requireColumns: ['line', 'x'],
            debug: {
                itemMerger: new LineItemMerger_1.default(),
            },
        });
    }
    transform(_, inputItems) {
        return {
            items: groupingUtils_1.transformGroupedByPageAndLine(inputItems, (_, __, items) => {
                return items.sort((a, b) => a.data['x'] - b.data['x']);
            }),
            messages: [],
        };
    }
}
exports.default = SortXWithinLines;
