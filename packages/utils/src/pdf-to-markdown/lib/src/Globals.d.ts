import GlobalDefinition from './GlobalDefinition';
import GlobalValue from './GlobalValue';
export default class Globals {
    map: Map<string, any>;
    constructor(globals?: Globals);
    keys(): string[];
    isDefined<T>(definition: GlobalDefinition<T>): boolean;
    get<T>(definition: GlobalDefinition<T>): T;
    getOptional<T>(definition: GlobalDefinition<T>): T | undefined;
    set<T>(definition: GlobalDefinition<T>, value: T): void;
    override<T>(definition: GlobalDefinition<T>, value: T): void;
    withValues(values: GlobalValue<any>[] | undefined): Globals;
}
