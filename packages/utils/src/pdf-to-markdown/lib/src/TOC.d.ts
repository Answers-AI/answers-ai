import Item from './Item';
import ItemType from './ItemType';
/**
 * Table of contents usually parsed by  `DetectToc.ts`.
 */
export default class TOC {
    tocHeadlineItems: Item[];
    pages: number[];
    detectedHeadlineLevels: Set<ItemType>;
    constructor(tocHeadlineItems: Item[], pages: number[], detectedHeadlineLevels: Set<ItemType>);
    startPage(): number;
    endPage(): number;
}
