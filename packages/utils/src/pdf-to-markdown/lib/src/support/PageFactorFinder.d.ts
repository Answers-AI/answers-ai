declare type NumberExtractor = (container: any) => Extract;
declare type Extract = {
    index: number;
    numbers: number[];
};
export default class PageFactorFinder {
    find(containers: any[], extractor: NumberExtractor, config?: {
        sampleCount: number;
        minFulfillment: number;
    }): number | undefined;
}
export {};
