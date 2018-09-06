
export class PackageMetadata {
    private readonly _name?: string;
    private readonly _version?: string;
    private readonly _repositoryName?: string;

    constructor(name: string, version: string) {
        this._name = name;
        this._repositoryName = name;
        this._version = version;
    }

    get name(): string {
        return this._name!;
    }

    get version(): string {
        return this._version!;
    }

    get repositoryName(): string {
        return this._repositoryName!;
    }
}
