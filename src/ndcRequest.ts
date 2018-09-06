/**
 * @author benjamin.krenn@leftshift.one - 7/7/18.
 * @since 0.1.0
 */
export class NdcRequest {

    private readonly _packageJsonPath?: string;

    private readonly _exitCode?: number;

    private readonly _export: string[];

    private readonly _printStats: boolean;

    constructor(builder: NdcRequestBuilder) {
        this._packageJsonPath = builder.packageJsonPath;
        this._exitCode = builder.exitCode;
        this._export = builder.export;
        this._printStats = builder.printStats
    }

    get packageJsonPath(): string | undefined {
        return this._packageJsonPath;
    }

    get exitCode(): number | undefined {
        return this._exitCode;
    }

    get export(): string[] {
        return this._export;
    }

    get printStats(): boolean {
        return this._printStats;
    }

    public static builder(): NdcRequestBuilder {
        return new NdcRequestBuilder();
    }
}

export class NdcRequestBuilder {
    public packageJsonPath?: string;
    public exitCode: number = 0;
    public export: string[] = [];
    public printStats = true;

    public withPackageJsonPath(path: string) {
        this.packageJsonPath = path;
        return this;
    }

    public withExitCode(exitCode: number) {
        this.exitCode = exitCode;
        return this;
    }

    public withExport(url: string[]) {
        this.export = url;
        return this;
    }

    public withPrintedStats(bool: boolean) {
        this.printStats = bool;
        return this;
    }

    public build() {
        return new NdcRequest(this);
    }
}
