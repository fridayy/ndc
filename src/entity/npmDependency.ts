import {Dependency, DependencyType} from './dependency';

export class NpmDependency implements Dependency {
    public readonly distTag: string;
    public readonly version: string;
    public readonly type: DependencyType;


    constructor(distTag: string, version: string, type: DependencyType) {
        this.distTag = distTag;
        this.version = version;
        this.type = type;
    }
}
