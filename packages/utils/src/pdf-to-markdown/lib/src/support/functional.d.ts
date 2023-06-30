export declare function flatMap<T, S>(array: T[], func: (element: T, idx: number) => S[]): S[];
export declare function groupBy<T>(array: T[], groupKey: (element: T) => any): T[][];
export declare function flatten<T>(array: T[][]): T[];
export declare function arraysEqual(a: any[], b: any): boolean;
