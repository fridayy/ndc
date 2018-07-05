export class ComparisonResult {
    readonly distTag: string;
    readonly currentVersion: string;
    readonly latestVersion: string;

    constructor(distTag: string, currentVersion: string, latestVersion: string) {
        this.distTag = distTag;
        this.currentVersion = currentVersion;
        this.latestVersion = latestVersion;
    }
}