import Item from '../Item';
import EvaluationIndex from './EvaluationIndex';
export default class EvaluationTracker implements EvaluationIndex {
    private evaluations;
    private scored;
    evaluationCount(): number;
    hasScores(): boolean;
    evaluated(item: Item): boolean;
    evaluationScore(item: Item): any;
    trackEvaluation(item: Item, score?: any): void;
}
