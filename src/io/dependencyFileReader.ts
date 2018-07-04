import {FileReader} from './fileReader';
import {Dependency, DependencyType} from '../entity/dependency';
import {Map, Set} from 'immutable';
import * as fs from 'fs';
import {Assert} from '../util/assert';
import {NpmDependency} from "../entity/npmDependency";
import {promisify} from "util";

export class DependencyFileReader implements FileReader<Promise<Set<Dependency>>> {

    public async read(path: string): Promise<Set<Dependency>> {
        Assert.notNullOrUndefined(path, 'Path to package.json can not be null or undefined');

        const packageJson = JSON.parse(await DependencyFileReader.readPackageJson(path));
        const dependencies = packageJson.dependencies;
        const devDependencies = packageJson.devDependencies;

        const dependenciesSet = Map(dependencies)
            .map((value, key) => new NpmDependency(key as string, value as string, DependencyType.RUNTIME))
            .toSet();

        const devDependenciesSet = Map(devDependencies)
            .map((value, key) => new NpmDependency(key as string, value as string, DependencyType.DEV))
            .toSet();

        return dependenciesSet.union(devDependenciesSet);
    }

    private static async readPackageJson(path: string): Promise<string> {
        const readFile = promisify(fs.readFile);
        return readFile(path, 'UTF-8');
    }
}