import Item from '../Item';
import ItemResult from '../ItemResult';
import ItemTransformer from './ItemTransformer';
import TransformContext from './TransformContext';
export default class AdjustHeight extends ItemTransformer {
    constructor();
    transform(context: TransformContext, inputItems: Item[]): ItemResult;
}
