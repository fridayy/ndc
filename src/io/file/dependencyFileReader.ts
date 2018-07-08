import {FileReader} from './fileReader';
import {Dependency} from '../../entity/dependency';
import {Observable} from 'rxjs/Observable';
import {promisify} from 'util';
import * as fs from 'fs';
import {Assert} from '../../util/assert';
import 'rxjs-compat/add/observable/fromPromise';
import 'rxjs-compat/add/operator/map';
import 'rxjs-compat/add/operator/mergeMap';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/observable/from';
import 'rxjs-compat/add/operator/zip';
import {NpmDependency} from '../../entity/npmDependency';
import "rxjs-compat/add/operator/do";
import {IO} from "../../util/io";
import {Severity} from "../../util/severity";

/**
 * @author benjamin.krenn@leftshift.one - 7/7/18.
 * @since 0.1.0
 */
export class DependencyFileReader
    implements FileReader<Observable<Dependency>> {
    read(path: string): Observable<Dependency> {
        Assert.notNullOrUndefined(path, 'path can not be undefined or null');
        const promisifiedFileReader = promisify(fs.readFile);

        return Observable.fromPromise(promisifiedFileReader(path, 'UTF-8'))
            .map(str => JSON.parse(str))
            .flatMap(packageJson =>
                Observable.of(packageJson.dependencies, packageJson.devDependencies)
            )
            .flatMap(json => {
                const jsonKeys = Observable.from(Object.keys(json));
                const jsonValues = Observable.from(Object.values(json));

                return jsonKeys.zip(jsonValues);
            })
            .map(item => new NpmDependency(item[0], item[1] as string))
            .do(() => {}, err => IO.println("Could not read package.json file.", Severity.ERROR));
    }
}
