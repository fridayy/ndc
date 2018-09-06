/**
 * @author benjamin.krenn@leftshift.one - 7/11/18.
 * @since 0.1.0
 */
import {Dependency} from "./dependency";

export class PackageJson {
    private readonly _name: string;
    private readonly _version: string;
    private readonly _dependencies: Dependency[];
    private readonly _devDependencies: Dependency[];


    constructor(name: string, version: string, dependencies: Dependency[], devDependencies: Dependency[]) {
        this._name = name;
        this._version = version;
        this._dependencies = dependencies;
        this._devDependencies = devDependencies;
    }

    get name(): string {
        return this._name;
    }

    get version(): string {
        return this._version;
    }

    get dependencies(): Dependency[] {
        return this._dependencies;
    }

    get devDependencies(): Dependency[] {
        return this._devDependencies;
    }
}
