"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPipeline = exports.parseReporter = exports.pdfParser = exports.transformers = void 0;
const ParseProgressReporter_1 = require("./ParseProgressReporter");
const PdfParser_1 = require("./PdfParser");
const PdfPipeline_1 = require("./PdfPipeline");
const AdjustHeight_1 = require("./transformer/AdjustHeight");
const UnwrapCoordinates_1 = require("./transformer/UnwrapCoordinates");
const RemoveEmptyItems_1 = require("./transformer/RemoveEmptyItems");
const CacluclateStatistics_1 = require("./transformer/CacluclateStatistics");
const CompactLines_1 = require("./transformer/CompactLines");
const SortXWithinLines_1 = require("./transformer/SortXWithinLines");
const RemoveRepetitiveItems_1 = require("./transformer/RemoveRepetitiveItems");
const DetectToc_1 = require("./transformer/DetectToc");
const NoOpTransformer_1 = require("./transformer/NoOpTransformer");
exports.transformers = [
    new AdjustHeight_1.default(),
    new UnwrapCoordinates_1.default(),
    new RemoveEmptyItems_1.default(),
    new CacluclateStatistics_1.default(),
    new CompactLines_1.default(),
    new SortXWithinLines_1.default(),
    new RemoveRepetitiveItems_1.default(),
    new DetectToc_1.default(),
    new NoOpTransformer_1.default(),
];
const defaultConfig = {
    pdfjsParams: {
        // TODO check if that cmap thing makes sense since we don't bundle them
        cMapUrl: 'cmaps/',
        cMapPacked: true,
    },
    transformers: exports.transformers,
};
function pdfParser(pdfJs) {
    return new PdfParser_1.default(pdfJs, defaultConfig.pdfjsParams);
}
exports.pdfParser = pdfParser;
function parseReporter(progressListener) {
    return new ParseProgressReporter_1.default(progressListener);
}
exports.parseReporter = parseReporter;
function createPipeline(pdfJs, config = defaultConfig) {
    const parser = new PdfParser_1.default(pdfJs, config.pdfjsParams);
    return new PdfPipeline_1.default(parser, config.transformers || exports.transformers);
}
exports.createPipeline = createPipeline;
