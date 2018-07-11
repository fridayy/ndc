/**
 * @author benjamin.krenn@leftshift.one - 7/11/18.
 * @since 1.0.0
 */
import {Dependency} from "./dependency";

export class PackageJson {
    readonly name?: string;
    readonly version?: string;
    readonly dependencies?: Dependency[];
    readonly devDependencies?: Dependency[];


    constructor(name: string, version: string, dependencies: Dependency[], devDependencies: Dependency[]) {
        this.name = name;
        this.version = version;
        this.dependencies = dependencies;
        this.devDependencies = devDependencies;
    }
}