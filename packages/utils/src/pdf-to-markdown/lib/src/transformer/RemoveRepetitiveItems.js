"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_similarity_1 = require("string-similarity");
const ItemTransformer_1 = require("./ItemTransformer");
const LineItemMerger_1 = require("../debug/LineItemMerger");
const CacluclateStatistics_1 = require("./CacluclateStatistics");
const groupingUtils_1 = require("../support/groupingUtils");
const stringFunctions_1 = require("../support/stringFunctions");
const stringFunctions_2 = require("../support/stringFunctions");
const config = {
    // From the absolute fringe elements (min/max y) how much y can item deviate before beeing disregarded.
    maxDistanceFromFringeElements: 45,
    // Max neighbour taken (in one direction) for detecting neighbour similarity.
    // Choosen number might be more effectful for PDFs with a strong odd/evan page differernce.
    neighbourReach: 2,
    minScore: 0.7,
};
class RemoveRepetitiveItems extends ItemTransformer_1.default {
    constructor() {
        super('Remove Repetitive Items', 'Remove things like page numbers or license footers.', {
            requireColumns: ['x', 'y', 'str', 'line'],
            debug: {
                itemMerger: new LineItemMerger_1.default(),
            },
        });
    }
    transform(context, inputItems) {
        const minY = context.getGlobal(CacluclateStatistics_1.MIN_Y);
        const maxY = context.getGlobal(CacluclateStatistics_1.MAX_Y);
        const bottomMaxY = minY + config.maxDistanceFromFringeElements;
        const topMinY = maxY - config.maxDistanceFromFringeElements;
        // console.log('bottomMaxY', bottomMaxY, 'topMinY', topMinY);
        const fringeItems = inputItems.filter((item) => {
            const y = item.data['y'];
            return y <= bottomMaxY || y >= topMinY;
        });
        const fringeLines = groupingUtils_1.flatMap(groupingUtils_1.groupByPage(fringeItems).map((pageItems) => groupingUtils_1.groupByLine(pageItems)
            .map((lineItems) => {
            const lineY = yFromLineItems(lineItems);
            return new PageLine(pageItems[0].page, lineY, lineItems);
        })
            .sort((a, b) => a.y - b.y)), (e) => e);
        const fringeYs = fringeLines
            .map((line) => line.y)
            .filter(groupingUtils_1.onlyUniques)
            .sort(groupingUtils_1.ascending);
        const yScoreMap = calculateScores(context, fringeYs, fringeLines);
        // console.log('uniqueYs', uniqueYs);
        let removalCount = 0;
        const removedY = [...yScoreMap.entries()]
            .filter(([_, value]) => value.value >= config.minScore)
            .map(([key, _]) => key)
            .join('||');
        return {
            items: groupingUtils_1.transformGroupedByPageAndLine(inputItems, (_, __, lineItems) => {
                const itemsY = yFromLineItems(lineItems);
                const score = yScoreMap.get(itemsY);
                if (score) {
                    lineItems.forEach((item) => context.trackEvaluation(item, score.description));
                    if (score.value >= config.minScore) {
                        removalCount++;
                        return [];
                    }
                }
                return lineItems;
            }),
            messages: [`Filtered out ${removalCount} items with y == ${removedY}`],
        };
    }
}
exports.default = RemoveRepetitiveItems;
function calculateScores(context, fringeYs, fringeLines) {
    const pageMapping = context.getGlobal(CacluclateStatistics_1.PAGE_MAPPING);
    const map = new Map();
    fringeYs.forEach((y) => {
        const yLines = fringeLines.filter((line) => line.y == y);
        if (yLines.length < 2) {
            map.set(y, new Score(0, `0 (only on ${yLines.length} page(s))`));
        }
        else {
            const pageNumberScore = pageMapping.detectedOnPage
                ? calculatePageNumerScore(context.pageCount, pageMapping.pageFactor, yLines)
                : 0;
            const textSimilarityScore = textSimilarity(yLines);
            // TODO possibly refine with:
            // - exclude headlines (higher height, e.g art of speaking)
            // - structural similarity (x, y, height, etc)
            // - contain chapter headings
            const totalScore = pageNumberScore + textSimilarityScore;
            map.set(y, new Score(totalScore, `${totalScore.toFixed(2)}: (${pageNumberScore.toFixed(2)} + ${textSimilarityScore.toFixed(2)})`));
        }
    });
    return map;
}
function calculatePageNumerScore(pageCount, pageFactor, lines) {
    const maxPageNumbers = pageCount + pageFactor;
    const linesWithPageNumbers = lines.filter((line) => stringFunctions_2.extractNumbers(line.text()).includes(line.page + pageFactor))
        .length;
    return linesWithPageNumbers / Math.min(maxPageNumbers, lines.length);
}
function textSimilarity(lines) {
    const similarities = groupingUtils_1.flatMap(lines, (line, idx) => adiacentLines(lines, idx).map((adiacentLine) => calculateSimilarity(line, adiacentLine)));
    return groupingUtils_1.median(similarities);
}
function calculateSimilarity(line1, line2) {
    if (line1.textWithoutNumbers().length === 0) {
        return 0;
    }
    return string_similarity_1.compareTwoStrings(line1.textWithoutNumbers(), line2.textWithoutNumbers());
}
function adiacentLines(lines, index) {
    // Prefer to either collect x downstream OR x upstream neighbours (not a mix) in order to better catch odd/even page differences
    let neighbours;
    if (index + config.neighbourReach < lines.length) {
        neighbours = lines.slice(index + 1, index + config.neighbourReach + 1);
    }
    else if (index - config.neighbourReach >= 0) {
        neighbours = lines.slice(index - config.neighbourReach - 1, index - 1);
    }
    else {
        neighbours = lines.filter((_, idx) => idx !== index);
    }
    return neighbours;
}
function yFromLineItems(lineItems) {
    return Math.round(groupingUtils_1.mostFrequent(lineItems, 'y'));
}
class Score {
    constructor(value, description) {
        this.value = value;
        this.description = description;
    }
}
/**
 * A number of Items on a line (~same y) on a page.
 */
class PageLine {
    constructor(page, y, items) {
        this.page = page;
        this.y = y;
        this.items = items;
    }
    text() {
        if (!this._text) {
            this._text = this.items.reduce((all, item) => all + item.data['str'], '');
        }
        return this._text;
    }
    textWithoutNumbers() {
        if (!this._textWithoutNumbers) {
            this._textWithoutNumbers = stringFunctions_1.filterOutDigits(this.text());
        }
        return this._textWithoutNumbers;
    }
}
