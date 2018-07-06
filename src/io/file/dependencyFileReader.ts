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
            .map(item => new NpmDependency(item[0], item[1] as string));
    }
}
