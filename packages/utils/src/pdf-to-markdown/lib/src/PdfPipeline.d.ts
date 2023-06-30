import PdfParser from './PdfParser';
import ProgressListenFunction from './ProgressListenFunction';
import ItemTransformer from './transformer/ItemTransformer';
import ParseResult from './ParseResult';
import Debugger from './Debugger';
export default class PdfPipeline {
    parser: PdfParser;
    transformers: ItemTransformer[];
    constructor(parser: PdfParser, transformers: ItemTransformer[]);
    private parse;
    execute(src: string | Uint8Array | object, progressListener: ProgressListenFunction): Promise<ParseResult>;
    debug(src: string | Uint8Array | object, progressListener: ProgressListenFunction): Promise<Debugger>;
    /**
     * Goes through all transformer and makes sure each required column is available in its predecessor schema.
     *
     * @param inputSchema
     * @param transformers
     */
    verifyRequiredColumns(inputSchema: string[], transformers: ItemTransformer[]): void;
}
