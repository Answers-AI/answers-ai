"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.majorityElement = exports.mostFrequent = exports.transformGroupedByPageAndLine = exports.transformGroupedByPage = exports.groupByElement = exports.groupByLine = exports.groupByPage = exports.median = exports.count = exports.descending = exports.ascending = exports.onlyUniques = exports.flatMap = void 0;
function flatMap(array, func) {
    return array.reduce((result, entry, idx) => result.concat(func(entry, idx)), []);
}
exports.flatMap = flatMap;
function onlyUniques(value, index, self) {
    return self.indexOf(value) === index;
}
exports.onlyUniques = onlyUniques;
function ascending(a, b) {
    return a - b;
}
exports.ascending = ascending;
function descending(a, b) {
    return b - a;
}
exports.descending = descending;
function count(array, find) {
    return array.reduce((count, entry) => (find(entry) ? count + 1 : count), 0);
}
exports.count = count;
function median(values) {
    if (values.length === 0)
        return 0;
    values.sort(function (a, b) {
        return a - b;
    });
    var half = Math.floor(values.length / 2);
    if (values.length % 2)
        return values[half];
    return (values[half - 1] + values[half]) / 2.0;
}
exports.median = median;
function groupBy(items, extractKey) {
    return items.reduce((pageItems, item) => {
        const lastPageItems = pageItems[pageItems.length - 1];
        if (!lastPageItems || extractKey(item) !== extractKey(lastPageItems[0])) {
            pageItems.push([item]);
        }
        else {
            lastPageItems.push(item);
        }
        return pageItems;
    }, []);
}
function groupByPage(items) {
    return groupBy(items, (item) => item.page);
}
exports.groupByPage = groupByPage;
function groupByLine(items) {
    return groupByElement(items, 'line');
}
exports.groupByLine = groupByLine;
function groupByElement(items, elementName) {
    return groupBy(items, (item) => item.data[elementName]);
}
exports.groupByElement = groupByElement;
function transformGroupedByPage(items, groupedTransformer) {
    return new Array().concat(...groupByPage(items).map((pageItems) => groupedTransformer(pageItems[0].page, pageItems)));
}
exports.transformGroupedByPage = transformGroupedByPage;
function transformGroupedByPageAndLine(items, groupedTransformer) {
    let transformedItems = [];
    groupByPage(items).forEach((pageItems) => {
        groupByElement(pageItems, 'line').forEach((lineItems) => {
            transformedItems.push(...groupedTransformer(pageItems[0].page, lineItems[0].data['line'], lineItems));
        });
    });
    return transformedItems;
}
exports.transformGroupedByPageAndLine = transformGroupedByPageAndLine;
function mostFrequent(items, dataElementKey) {
    const occurenceMap = items.reduce((map, item) => {
        const key = item.data[dataElementKey];
        const occurrence = map.get(key) || 0;
        map.set(key, occurrence + 1);
        return map;
    }, new Map());
    const topElement = [...occurenceMap].reduce((topEntry, entry) => (entry[1] >= topEntry[1] ? entry : topEntry), [undefined, 0])[0];
    //TODO optimally we should handle the 50/50 case
    return topElement;
}
exports.mostFrequent = mostFrequent;
function majorityElement(items, extract) {
    if (items.length == 0) {
        return;
    }
    let maj = 0, count = 1;
    for (let i = 1; i < items.length; i++) {
        if (extract(items[i]) === extract(items[maj])) {
            count++;
        }
        else {
            count--;
        }
        if (count === 0) {
            maj = i;
            count = 1;
        }
    }
    return extract(items[maj]);
}
exports.majorityElement = majorityElement;
