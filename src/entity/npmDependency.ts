import {Dependency, DependencyType} from './dependency';

export class NpmDependency implements Dependency {
    public readonly distTag: string;
    public readonly version: string;


    constructor(distTag: string, version: string) {
        this.distTag = distTag;
        this.version = version;
    }
}
