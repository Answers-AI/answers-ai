"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParseProgressReporter_1 = require("./ParseProgressReporter");
const Debugger_1 = require("./Debugger");
const assert_1 = require("./assert");
const TransformContext_1 = require("./transformer/TransformContext");
const Globals_1 = require("./Globals");
class PdfPipeline {
    constructor(parser, transformers) {
        this.parser = parser;
        this.transformers = transformers;
    }
    parse(src, progressListener) {
        return __awaiter(this, void 0, void 0, function* () {
            const parseResult = yield this.parser.parse(src, new ParseProgressReporter_1.default(progressListener));
            this.verifyRequiredColumns(parseResult.schema, this.transformers);
            return parseResult;
        });
    }
    //TODO PipelineResult
    execute(src, progressListener) {
        return __awaiter(this, void 0, void 0, function* () {
            const parseResult = yield this.parse(src, progressListener);
            this.verifyRequiredColumns(parseResult.schema, this.transformers);
            let items = parseResult.items;
            let globals = new Globals_1.default();
            const context = new TransformContext_1.default(parseResult.fontMap, parseResult.pageViewports, globals);
            this.transformers.forEach((transformer) => {
                const result = transformer.transform(context, items);
                globals = globals.withValues(result.globals);
                items = result.items;
            });
            parseResult.items = items;
            return parseResult;
        });
    }
    debug(src, progressListener) {
        return __awaiter(this, void 0, void 0, function* () {
            const parseResult = yield this.parse(src, progressListener);
            return new Debugger_1.default(parseResult.fontMap, parseResult.pageViewports, parseResult.pageCount, parseResult.schema, parseResult.items, this.transformers);
        });
    }
    /**
     * Goes through all transformer and makes sure each required column is available in its predecessor schema.
     *
     * @param inputSchema
     * @param transformers
     */
    verifyRequiredColumns(inputSchema, transformers) {
        var _a;
        const schemas = [inputSchema];
        for (let idx = 0; idx < transformers.length; idx++) {
            const transformer = transformers[idx];
            const predecessorSchema = schemas[idx];
            (_a = transformer.descriptor.requireColumns) === null || _a === void 0 ? void 0 : _a.forEach((column) => {
                assert_1.assert(predecessorSchema.includes(column), `Input schema [${predecessorSchema.join(', ')}] for transformer '${transformer.name}' does not contain the required column '${column}'`);
            });
            const outputSchema = transformer.schemaTransformer(predecessorSchema);
            schemas.push(outputSchema);
        }
    }
}
exports.default = PdfPipeline;
