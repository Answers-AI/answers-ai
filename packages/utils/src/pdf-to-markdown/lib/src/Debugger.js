"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TransformContext_1 = require("./transformer/TransformContext");
const StageResult_1 = require("./debug/StageResult");
const ColumnAnnotation_1 = require("./debug/ColumnAnnotation");
const detectChanges_1 = require("./debug/detectChanges");
const Page_1 = require("./debug/Page");
const EvaluationTracker_1 = require("./debug/EvaluationTracker");
const ChangeTracker_1 = require("./debug/ChangeTracker");
const Globals_1 = require("./Globals");
class Debugger {
    constructor(fontMap, pageViewports, pageCount, inputSchema, inputItems, transformers) {
        this.fontMap = fontMap;
        this.pageViewports = pageViewports;
        this.pageCount = pageCount;
        this.transformers = transformers;
        this.stageNames = ['Parse Result', ...transformers.map((t) => t.name)];
        this.stageDescriptions = ['Initial items as parsed by PDFjs', ...transformers.map((t) => t.description)];
        this.stageResultCache = [StageResult_1.initialStage(inputSchema, inputItems)];
    }
    stageResult(stageIndex) {
        var _a;
        for (let idx = 0; idx < stageIndex + 1; idx++) {
            if (!this.stageResultCache[idx]) {
                const evaluations = new EvaluationTracker_1.default();
                const transformer = this.transformers[idx - 1];
                const previousStageResult = this.stageResultCache[idx - 1];
                const context = new TransformContext_1.default(this.fontMap, this.pageViewports, previousStageResult.globals, evaluations);
                const previousItems = previousStageResult.itemsCleanedAndUnpacked();
                const inputSchema = toSimpleSchema(previousStageResult);
                const outputSchema = transformer.schemaTransformer(inputSchema);
                const itemResult = transformer.transform(context, [...previousItems]);
                const globals = new Globals_1.default(previousStageResult.globals).withValues(itemResult.globals);
                const changes = new ChangeTracker_1.default();
                const items = detectChanges_1.detectChanges(changes, previousItems, itemResult.items);
                const pages = Page_1.asPages(evaluations, changes, outputSchema, items, (_a = transformer.descriptor.debug) === null || _a === void 0 ? void 0 : _a.itemMerger);
                const messages = itemResult.messages;
                if (changes.changeCount() > 0 && messages.length === 0) {
                    messages.unshift(`Detected ${changes.changeCount()} changes`);
                }
                this.stageResultCache.push(new StageResult_1.default(globals, transformer.descriptor, toAnnotatedSchema(inputSchema, outputSchema), pages, evaluations, changes, messages));
            }
        }
        return this.stageResultCache[stageIndex];
    }
}
exports.default = Debugger;
function toSimpleSchema(stageResult) {
    return stageResult.schema
        .filter((column) => !column.annotation || column.annotation !== ColumnAnnotation_1.default.REMOVED)
        .map((column) => column.name);
}
function toAnnotatedSchema(inputSchema, outputSchema) {
    const annotatedSchema = [];
    let out_idx = 0;
    for (let in_idx = 0; in_idx < inputSchema.length; in_idx++) {
        const nextInputColumn = inputSchema[in_idx];
        const indexInOut = outputSchema.indexOf(nextInputColumn);
        if (indexInOut === -1) {
            annotatedSchema.push({ name: nextInputColumn, annotation: ColumnAnnotation_1.default.REMOVED });
        }
        else if (indexInOut > out_idx) {
            while (out_idx < indexInOut) {
                annotatedSchema.push({ name: outputSchema[out_idx], annotation: ColumnAnnotation_1.default.ADDED });
                out_idx++;
            }
            annotatedSchema.push({ name: nextInputColumn });
            out_idx++;
        }
        else {
            annotatedSchema.push({ name: nextInputColumn });
            out_idx++;
        }
    }
    for (let index = out_idx; index < outputSchema.length; index++) {
        annotatedSchema.push({ name: outputSchema[index], annotation: ColumnAnnotation_1.default.ADDED });
    }
    return annotatedSchema;
}
