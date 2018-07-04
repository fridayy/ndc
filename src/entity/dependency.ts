export interface Dependency {
    readonly distTag: string;
    readonly version: string;
    readonly type: DependencyType
}

export enum DependencyType {
    RUNTIME,
    DEV
}
