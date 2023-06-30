import ItemTransformer from './ItemTransformer';
import GlobalDefinition from '../GlobalDefinition';
import Item from '../Item';
import ItemResult from '../ItemResult';
import TransformContext from './TransformContext';
import TOC from '../TOC';
export declare const TOC_GLOBAL: GlobalDefinition<TOC>;
export default class DetectToc extends ItemTransformer {
    constructor();
    transform(context: TransformContext, inputItems: Item[]): ItemResult;
}
