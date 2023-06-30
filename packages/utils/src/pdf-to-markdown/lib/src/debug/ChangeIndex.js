"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionChange = exports.Direction = exports.ContentChange = exports.Removal = exports.Addition = exports.ChangeCategory = exports.Change = void 0;
class Change {
    constructor(category) {
        this.category = category;
    }
}
exports.Change = Change;
// This is merely for coloring different kind of changes
var ChangeCategory;
(function (ChangeCategory) {
    ChangeCategory["PLUS"] = "PLUS";
    ChangeCategory["MINUS"] = "MINUS";
    ChangeCategory["NEUTRAL"] = "NEUTRAL";
})(ChangeCategory = exports.ChangeCategory || (exports.ChangeCategory = {}));
class Addition extends Change {
    constructor() {
        super(ChangeCategory.PLUS);
    }
}
exports.Addition = Addition;
class Removal extends Change {
    constructor() {
        super(ChangeCategory.MINUS);
    }
}
exports.Removal = Removal;
class ContentChange extends Change {
    constructor() {
        super(ChangeCategory.NEUTRAL);
    }
}
exports.ContentChange = ContentChange;
var Direction;
(function (Direction) {
    Direction["UP"] = "UP";
    Direction["DOWN"] = "DOWN";
})(Direction = exports.Direction || (exports.Direction = {}));
class PositionChange extends Change {
    constructor(direction, amount) {
        super(direction === Direction.UP ? ChangeCategory.PLUS : ChangeCategory.MINUS);
        this.direction = direction;
        this.amount = amount;
    }
}
exports.PositionChange = PositionChange;
