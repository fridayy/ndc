export class ComparisonResult {

    private readonly _distTag: string;
    private readonly _currentVersion: string;
    private readonly _latestVersion: string;

    constructor(distTag: string, currentVersion: string, latestVersion: string) {
        this._distTag = distTag;
        this._currentVersion = currentVersion;
        this._latestVersion = latestVersion;
    }


    get distTag(): string {
        return this._distTag;
    }

    get currentVersion(): string {
        return this._currentVersion;
    }

    get latestVersion(): string {
        return this._latestVersion;
    }
}
