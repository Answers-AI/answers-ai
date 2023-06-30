"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChangeIndex_1 = require("./ChangeIndex");
const assert_1 = require("../assert");
const ADDITION = new ChangeIndex_1.Addition();
const REMOVAL = new ChangeIndex_1.Removal();
const CONTENT_CHANGE = new ChangeIndex_1.ContentChange();
class ChangeTracker {
    constructor() {
        this.changes = new Map();
    }
    addChange(item, change) {
        const uuid = item.uuid;
        assert_1.assertNot(this.changes.has(uuid), `Change for item ${uuid} already defined! (old: ${JSON.stringify(this.changes.get(uuid))}, new: ${JSON.stringify(change)})`);
        this.changes.set(uuid, change);
    }
    changeCount() {
        return this.changes.size;
    }
    trackAddition(item) {
        this.addChange(item, ADDITION);
    }
    trackRemoval(item) {
        this.addChange(item, REMOVAL);
    }
    trackPositionalChange(item, oldPosition, newPosition) {
        const direction = newPosition > oldPosition ? ChangeIndex_1.Direction.DOWN : ChangeIndex_1.Direction.UP;
        const amount = Math.abs(newPosition - oldPosition);
        if (amount > 0) {
            this.addChange(item, new ChangeIndex_1.PositionChange(direction, amount));
        }
    }
    trackContentChange(item) {
        this.addChange(item, CONTENT_CHANGE);
    }
    change(item) {
        return this.changes.get(item.uuid);
    }
    hasChanged(item) {
        return this.changes.has(item.uuid);
    }
    isPlusChange(item) {
        var _a;
        return ((_a = this.change(item)) === null || _a === void 0 ? void 0 : _a.category) === ChangeIndex_1.ChangeCategory.PLUS;
    }
    isNeutralChange(item) {
        var _a;
        return ((_a = this.change(item)) === null || _a === void 0 ? void 0 : _a.category) === ChangeIndex_1.ChangeCategory.NEUTRAL;
    }
    isMinusChange(item) {
        var _a;
        return ((_a = this.change(item)) === null || _a === void 0 ? void 0 : _a.category) === ChangeIndex_1.ChangeCategory.MINUS;
    }
    isRemoved(item) {
        var _a;
        return ((_a = this.change(item)) === null || _a === void 0 ? void 0 : _a.constructor.name) === REMOVAL.constructor.name;
    }
}
exports.default = ChangeTracker;
