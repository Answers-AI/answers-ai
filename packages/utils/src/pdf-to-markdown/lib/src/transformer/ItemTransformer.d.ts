import TransformDescriptor from '../TransformDescriptor';
import type TransformContext from './TransformContext';
import type Item from '../Item';
import type ItemResult from '../ItemResult';
/**
 * Transforms the incoming schema to what the transformer produces.
 */
declare type SchemaTransformer = (incomingSchema: string[]) => string[];
export default abstract class ItemTransformer {
    readonly name: string;
    readonly description: string;
    readonly descriptor: TransformDescriptor;
    readonly schemaTransformer: SchemaTransformer;
    constructor(name: string, description: string, descriptorPartial: Partial<TransformDescriptor>, schemaTransformer?: SchemaTransformer);
    abstract transform(context: TransformContext, inputItems: Item[]): ItemResult;
}
export {};
