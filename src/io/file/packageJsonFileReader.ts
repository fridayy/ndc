import {FileReader} from "./fileReader";
import {PackageJson} from "../../entity/packageJson";
import {Assert} from "../../util/assert";
import * as fs from "fs";
import {Observable} from "rxjs/Observable";
import "rxjs-compat/add/observable/fromPromise";
import "rxjs-compat/add/operator/map";
import {NpmDependency} from "../../entity/npmDependency";
import {Dependency} from "../../entity/dependency";
import "rxjs-compat/add/operator/mergeMap";
import "rxjs-compat/add/operator/reduce";
import "rxjs-compat/add/observable/of";
import "rxjs-compat/add/operator/zip";
import "rxjs-compat/add/observable/from";
import * as util from "util";
import {IO} from "../../util/io";
import "rxjs-compat/add/operator/do";
import chalk from "chalk";

/**
 * @author benjamin.krenn@leftshift.one - 7/11/18.
 * @since 1.0.0
 */
export class PackageJsonFileReader implements FileReader<Observable<PackageJson>> {
    read(path: string): Observable<PackageJson> {
        Assert.notNullOrUndefined(path, 'path can not be undefined or null');
        const promisifiedFileReader = util.promisify(fs.readFile);

        return Observable.fromPromise(promisifiedFileReader(path, 'UTF-8'))
            .map(str => JSON.parse(str))
            .flatMap(json => {
                return this.mapToArray(json.dependencies).zip(this.mapToArray(json.devDependencies))
                    .flatMap(tuple => {
                        return Observable.of(new PackageJson(json.name, json.version, tuple[0], tuple[1]))
                    })
            })
            .do(() => {}, error => IO.println(`${chalk.red('Could not find package.json! Consider using -p')}`));
    }

    private mapToArray(json: any): Observable<Dependency[]> {
        return Observable.of(json)
            .flatMap(json => {
                const jsonKeys = Observable.from(Object.keys(json));
                const jsonValues = Observable.from(Object.values(json));

                return jsonKeys.zip(jsonValues);
            }).map(item => new NpmDependency(item[0], item[1] as string))
            .reduce((acc, val) => {
                acc.push(val);
                return acc
            }, [])
    }
}