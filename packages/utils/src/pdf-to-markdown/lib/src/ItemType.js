"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./assert");
var ItemType;
(function (ItemType) {
    ItemType["H1"] = "H1";
    ItemType["H2"] = "H2";
    ItemType["H3"] = "H3";
    ItemType["H4"] = "H4";
    ItemType["H5"] = "H5";
    ItemType["H6"] = "H6";
})(ItemType || (ItemType = {}));
exports.default = ItemType;
(function (ItemType) {
    /**
     * @param level 1-6
     * @returns
     */
    function header(level) {
        const type = ItemType[`H${level}`];
        assert_1.assertDefined(type, `No header for level '${level}' defined`);
        return type;
    }
    ItemType.header = header;
})(ItemType || (ItemType = {}));
