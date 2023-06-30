"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Item {
    constructor(page, data, uuid = uuid_1.v4()) {
        this.page = page;
        this.data = data;
        this.uuid = uuid;
    }
    value(column) {
        return this.data[column];
    }
    withDataAddition(data) {
        return this.withData(Object.assign(Object.assign({}, this.data), data));
    }
    withData(data) {
        return new Item(this.page, data, this.uuid);
    }
    /**
     * Returns the item without a uuid.
     */
    withoutUuid() {
        return new Item(this.page, this.data, '');
    }
}
exports.default = Item;
