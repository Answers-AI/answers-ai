export default class Item {
    page: number;
    data: object;
    uuid: string;
    constructor(page: number, data: object, uuid?: string);
    value(column: string): object;
    withDataAddition(data: object): Item;
    withData(data: object): Item;
    /**
     * Returns the item without a uuid.
     */
    withoutUuid(): Item;
}
