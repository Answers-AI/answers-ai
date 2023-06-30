"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialStage = void 0;
const TransformDescriptor_1 = require("../TransformDescriptor");
const PdfParser_1 = require("../PdfParser");
const Page_1 = require("./Page");
const ChangeTracker_1 = require("./ChangeTracker");
const ItemGroup_1 = require("./ItemGroup");
const EvaluationTracker_1 = require("./EvaluationTracker");
const Globals_1 = require("../Globals");
class StageResult {
    constructor(globals, descriptor, schema, pages, evaluations, changes, messages) {
        this.globals = globals;
        this.descriptor = descriptor;
        this.schema = schema;
        this.pages = pages;
        this.evaluations = evaluations;
        this.changes = changes;
        this.messages = messages;
    }
    itemsUnpacked() {
        return this.pages.reduce((items, page) => {
            page.itemGroups.forEach((itemGroup) => itemGroup.unpacked().forEach((item) => items.push(item)));
            return items;
        }, []);
    }
    itemsCleanedAndUnpacked() {
        return this.pages.reduce((items, page) => {
            page.itemGroups.forEach((itemGroup) => itemGroup
                .unpacked()
                .filter((item) => !this.changes.isRemoved(item))
                .forEach((item) => items.push(item)));
            return items;
        }, []);
    }
    selectPages(relevantChangesOnly, groupItems) {
        var _a, _b, _c;
        let result;
        // Ungroup pages
        if (!groupItems && ((_b = (_a = this.descriptor) === null || _a === void 0 ? void 0 : _a.debug) === null || _b === void 0 ? void 0 : _b.itemMerger)) {
            result = this.pagesWithUnpackedItems();
        }
        else {
            result = this.pages;
        }
        // Filter out item (groups) with no changes
        if (relevantChangesOnly && !((_c = this.descriptor.debug) === null || _c === void 0 ? void 0 : _c.showAll) === true) {
            result = result.map((page) => (Object.assign(Object.assign({}, page), { itemGroups: page.itemGroups.filter((itemGroup) => this.evaluations.evaluated(itemGroup.top) || this.changes.hasChanged(itemGroup.top)) })));
        }
        return result;
    }
    pagesWithUnpackedItems() {
        return this.pages.map((page) => (Object.assign(Object.assign({}, page), { itemGroups: new Array().concat(...page.itemGroups.map((itemGroup) => itemGroup.unpacked().map((item) => new ItemGroup_1.default(item)))) })));
    }
}
exports.default = StageResult;
function initialStage(inputSchema, inputItems) {
    const schema = inputSchema.map((column) => ({ name: column }));
    const evaluations = new EvaluationTracker_1.default();
    const changes = new ChangeTracker_1.default();
    const pages = Page_1.asPages(evaluations, changes, PdfParser_1.PARSE_SCHEMA, inputItems);
    const messages = [
        `Parsed ${inputItems.length === 0 ? 0 : inputItems[inputItems.length - 1].page + 1} pages with ${inputItems.length} items`,
    ];
    return new StageResult(new Globals_1.default(), TransformDescriptor_1.toDescriptor({ debug: { showAll: true } }), schema, pages, evaluations, changes, messages);
}
exports.initialStage = initialStage;
