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
import "rxjs-compat/add/operator/catch";

/**
 * @author benjamin.krenn@leftshift.one - 7/11/18.
 * @since 0.1.0
 */
export class PackageJsonFileReader implements FileReader<Observable<PackageJson>> {

    public read(path: string): Observable<PackageJson> {
        Assert.notNullOrUndefined(path, 'path can not be undefined or null');
        const promisifiedFileReader = util.promisify(fs.readFile);

        return Observable.fromPromise(promisifiedFileReader(path, 'UTF-8'))
            .map(str => JSON.parse(str))
            .flatMap(parsedJson => {
                return this.mapToArray(parsedJson.dependencies).zip(this.mapToArray(parsedJson.devDependencies))
                    .flatMap(tuple => {
                        return Observable.of(new PackageJson(parsedJson.name, parsedJson.version, tuple[0], tuple[1]))
                    })
            })
            .catch(err => {
                IO.println(`${chalk.red('Could not find package.json! Consider using -p <path-to-packagejson>')}`);
                return Observable.empty();
            });
    }

    private mapToArray(json: any): Observable<Dependency[]> {
        return Observable.of(json)
            .flatMap(_ => {
                const jsonKeys = Observable.from(Object.keys(_));
                const jsonValues = Observable.from(Object.values(_));

                return jsonKeys.zip(jsonValues);
            }).map(item => new NpmDependency(item[0], item[1] as string))
            .reduce((acc, val) => {
                acc.push(val);
                return acc
            }, [])
    }
}
