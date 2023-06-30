"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arraysEqual = exports.flatten = exports.groupBy = exports.flatMap = void 0;
function flatMap(array, func) {
    return array.reduce((result, entry, idx) => result.concat(func(entry, idx)), []);
}
exports.flatMap = flatMap;
function groupBy(array, groupKey) {
    const groupMap = array.reduce((map, element) => {
        const key = groupKey(element);
        const elementsInGroup = map.get(key);
        if (elementsInGroup) {
            elementsInGroup.push(element);
        }
        else {
            map.set(key, [element]);
        }
        return map;
    }, new Map());
    return Array.from(groupMap, ([key, value]) => value);
}
exports.groupBy = groupBy;
function flatten(array) {
    return flatMap(array, (e) => e);
}
exports.flatten = flatten;
function arraysEqual(a, b) {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (a.length !== b.length)
        return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}
exports.arraysEqual = arraysEqual;
