"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./assert");
class Globals {
    constructor(globals) {
        this.map = globals ? new Map(globals.map) : new Map();
    }
    keys() {
        return [...this.map.keys()];
    }
    isDefined(definition) {
        return typeof this.map.get(definition.key) !== 'undefined';
    }
    get(definition) {
        const element = this.map.get(definition.key);
        assert_1.assertDefined(element, `No global with key '${definition.key}' registered. Only [${[...this.map.keys()].join(',')}]`);
        return element;
    }
    getOptional(definition) {
        return this.map.get(definition.key);
    }
    set(definition, value) {
        assert_1.assertNot(this.isDefined(definition), `Global with key '${definition.key}' already registered.`);
        this.map.set(definition.key, value);
    }
    override(definition, value) {
        this.map.set(definition.key, value);
    }
    withValues(values) {
        values === null || values === void 0 ? void 0 : values.forEach((value) => {
            if (value.override) {
                this.override(value.definition, value.value);
            }
            else {
                this.set(value.definition, value.value);
            }
        });
        return this;
    }
}
exports.default = Globals;
