
export class PackageMetadata {
    readonly name?: string;
    readonly version?: string;
    readonly repositoryName?: string;

    constructor(name: string, version: string) {
        this.name = name;
        this.repositoryName = name;
        this.version = version;
    }
}