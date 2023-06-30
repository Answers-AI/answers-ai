"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ItemMerger_1 = require("./ItemMerger");
const Item_1 = require("../Item");
const functional_1 = require("../support/functional");
const groupingUtils_1 = require("../support/groupingUtils");
class LineItemMerger extends ItemMerger_1.default {
    constructor(trackAsNew = false) {
        super('line');
        this.trackAsNew = trackAsNew;
    }
    merge(evaluationTracker, changeTracker, schema, items) {
        const page = items[0].page;
        const line = items[0].data['line'];
        const str = items.map((item) => item.data['str']).join(' ');
        const x = Math.min(...items.map((item) => item.data['x']));
        const y = Math.min(...items.map((item) => item.data['y']));
        const width = items.reduce((sum, item) => sum + item.data['width'], 0);
        const height = Math.max(...items.map((item) => item.data['height']));
        const fontNames = [...new Set(items.map((item) => item.data['fontName']))];
        const directions = [...new Set(items.map((item) => item.data['dir']))];
        const newItem = new Item_1.default(page, {
            str,
            line,
            x,
            y,
            width,
            height,
            fontName: fontNames,
            dir: directions,
        });
        if (schema.includes('types')) {
            const types = functional_1.flatten(items.map((item) => item.data['types'] || [])).filter(groupingUtils_1.onlyUniques);
            if (types.length > 0) {
                newItem.data['types'] = types;
            }
        }
        const evaluatedItem = items.find((item) => evaluationTracker.evaluated(item));
        if (evaluatedItem)
            evaluationTracker.trackEvaluation(newItem, evaluationTracker.evaluationScore(evaluatedItem));
        if (this.trackAsNew) {
            changeTracker.trackAddition(newItem);
        }
        else if (items.every((item) => changeTracker.isRemoved(item))) {
            changeTracker.trackRemoval(newItem);
        }
        else if (items.find((item) => changeTracker.hasChanged(item))) {
            changeTracker.trackContentChange(newItem);
        }
        return newItem;
    }
}
exports.default = LineItemMerger;
