export class NdcRequest {
    private _packageJsonPath?: string;

    private _exitCode?: number;

    private _export: boolean = false;

    constructor(builder: NdcRequestBuilder) {
        this._packageJsonPath = builder.packageJsonPath;
        this._exitCode = builder.exitCode;
        this._export = builder.export;
    }

    get packageJsonPath(): string | undefined {
        return this._packageJsonPath;
    }

    get exitCode(): number | undefined {
        return this._exitCode;
    }

    get export(): boolean {
        return this._export;
    }

    static builder(): NdcRequestBuilder {
        return new NdcRequestBuilder();
    }
}

export class NdcRequestBuilder {
    packageJsonPath?: string;
    exitCode: number = 0;
    export = false;

    public withPackageJsonPath(path: string) {
        this.packageJsonPath = path;
        return this;
    }

    public withExitCode(exitCode: number) {
        this.exitCode = exitCode;
        return this;
    }

    public withExport(bool: boolean) {
        this.export = bool;
        return this;
    }


    public build() {
        return new NdcRequest(this);
    }
}
