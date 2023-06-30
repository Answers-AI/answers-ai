import GlobalValue from './GlobalValue';
export default class GlobalDefinition<T> {
    key: string;
    constructor(key: string);
    value(value: T): any;
    overrideValue(value: T): GlobalValue<T>;
}
