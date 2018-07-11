
export class PackageMetadata {
    readonly name?: string;
    readonly version?: string;

    constructor(name: string, version: string) {
        this.name = name;
        this.version = version;
    }
}