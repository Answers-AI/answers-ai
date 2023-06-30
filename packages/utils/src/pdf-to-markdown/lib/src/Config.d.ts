import ItemTransformer from './transformer/ItemTransformer';
export default interface Config {
    pdfjsParams?: object;
    transformers?: ItemTransformer[];
}
