import Item from '../Item';
import ItemResult from '../ItemResult';
import ItemTransformer from './ItemTransformer';
import TransformContext from './TransformContext';
export default class CalculateCoordinates extends ItemTransformer {
    constructor();
    transform(_: TransformContext, inputItems: Item[]): ItemResult;
}
