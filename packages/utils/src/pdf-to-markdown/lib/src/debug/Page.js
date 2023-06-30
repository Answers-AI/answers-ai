"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asPages = void 0;
const groupingUtils_1 = require("../support/groupingUtils");
const ItemGroup_1 = require("./ItemGroup");
function asPages(evaluationTracker, changeTracker, schema, items, itemMerger) {
    return groupingUtils_1.groupByPage(items).map((pageItems) => {
        let itemGroups;
        if (itemMerger) {
            itemGroups = groupingUtils_1.groupByElement(pageItems, itemMerger.groupKey).map((groupItems) => {
                if (groupItems.length > 1) {
                    const top = itemMerger.merge(evaluationTracker, changeTracker, schema, groupItems);
                    return new ItemGroup_1.default(top, groupItems);
                }
                else {
                    return new ItemGroup_1.default(groupItems[0]);
                }
            });
        }
        else {
            itemGroups = pageItems.map((item) => new ItemGroup_1.default(item));
        }
        return { index: pageItems[0].page, itemGroups };
    });
}
exports.asPages = asPages;
