"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ItemTransformer_1 = require("./ItemTransformer");
const LineItemMerger_1 = require("../debug/LineItemMerger");
const groupingUtils_1 = require("../support/groupingUtils");
class CompactLines extends ItemTransformer_1.default {
    constructor() {
        super('Compact Lines', 'Combines items on the same y-axis', {
            requireColumns: ['str', 'y', 'height'],
            debug: {
                itemMerger: new LineItemMerger_1.default(true),
            },
        }, (incomingSchema) => {
            return incomingSchema.reduce((schema, column) => {
                if (column === 'x') {
                    return [...schema, 'line', 'x'];
                }
                return [...schema, column];
            }, new Array());
        });
    }
    transform(_, inputItems) {
        let lines = 0;
        return {
            items: groupingUtils_1.transformGroupedByPage(inputItems, (_, pageItems) => {
                let lineNumber = -1;
                let lastY;
                return pageItems.map((item) => {
                    const y = item.data['y'];
                    const height = item.data['height'];
                    if (!lastY || Math.abs(lastY - y) > (height / 4) * 3) {
                        lineNumber++;
                        lines++;
                    }
                    lastY = y;
                    return item.withDataAddition({ line: lineNumber });
                });
            }),
            messages: [`Formed ${lines} lines out of ${inputItems.length} items`],
        };
    }
}
exports.default = CompactLines;
