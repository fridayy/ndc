export interface Dependency {
    readonly distTag: string;
    readonly version: string;
}

export enum DependencyType {
    RUNTIME,
    DEV,
}
