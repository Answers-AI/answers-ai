import Item from '../Item';
import ItemType from '../ItemType';
export declare function getHeight(item: Item): number;
export declare function getText(item: Item): string;
export declare function joinText(items: Item[], joinCharacter: string): string;
export declare function getFontName(fontMap: Map<string, object>, item: Item): string;
export declare function itemWithType(item: Item, type: ItemType): Item;
