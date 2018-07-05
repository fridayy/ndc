export class NdcRequest {
    private packageJsonPath?: string;
    private exitCode?: number;

    constructor(builder: NdcRequestBuilder) {
        this.packageJsonPath = builder.packageJsonPath;
        this.exitCode = builder.exitCode;
    }
}

export class NdcRequestBuilder {

    packageJsonPath?: string;
    exitCode: number = 0;

    public packageJson(path: string) {
        this.packageJsonPath = path;
        return this;
    }

    public withExitCode(exitCode: number) {
        this.exitCode = exitCode;
        return this;
    }

    public build() {
        return new NdcRequest(this);
    }
}