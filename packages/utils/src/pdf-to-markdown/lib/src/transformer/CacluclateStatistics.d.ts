import Item from '../Item';
import ItemResult from '../ItemResult';
import ItemTransformer from './ItemTransformer';
import TransformContext from './TransformContext';
import GlobalDefinition from '../GlobalDefinition';
import PageMapping from '../PageMapping';
export declare const MIN_X: GlobalDefinition<number>;
export declare const MAX_X: GlobalDefinition<number>;
export declare const MIN_Y: GlobalDefinition<number>;
export declare const MAX_Y: GlobalDefinition<number>;
export declare const MAX_HEIGHT: GlobalDefinition<number>;
export declare const MOST_USED_HEIGHT: GlobalDefinition<number>;
export declare const PAGE_MAPPING: GlobalDefinition<PageMapping>;
export default class CalculateStatistics extends ItemTransformer {
    constructor();
    transform(context: TransformContext, items: Item[]): ItemResult;
}
