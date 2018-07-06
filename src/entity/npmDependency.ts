import {Dependency} from './dependency';

/**
 * @author benjamin.krenn@leftshift.one - 7/7/18.
 * @since 0.1.0
 */
export class NpmDependency implements Dependency {
    public readonly distTag: string;
    public readonly version: string;

    constructor(distTag: string, version: string) {
        this.distTag = distTag;
        this.version = version;
    }
}
