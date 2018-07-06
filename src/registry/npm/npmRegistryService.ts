import {RegistryService} from '../registryService';
import {Dependency} from '../../entity/dependency';
import {NpmDependency} from '../../entity/npmDependency';
import {Assert} from '../../util/assert';
import {Observable} from 'rxjs/Observable';
import 'rxjs-compat/add/observable/fromPromise';
import 'rxjs-compat/add/operator/map';
import 'rxjs-compat/add/operator/do';
import {HttpProvider} from '../../io/http/httpProvider';
import 'rxjs-compat/add/observable/from';
import 'rxjs-compat/add/operator/mergeMap';
import {NpmRegistryResponse} from './npmRegistryResponse';
import 'rxjs-compat/add/operator/concatMap';
import {Scheduler} from "rxjs-compat";
import "rxjs-compat/add/operator/startWith";

export class NpmRegistryService implements RegistryService {
    private readonly httpProvider: HttpProvider<any,
        Observable<NpmRegistryResponse>>;

    constructor(httpProvider: HttpProvider<any, Observable<NpmRegistryResponse>>) {
        this.httpProvider = httpProvider;
    }

    public latestVersion(distTag: string): Observable<NpmRegistryResponse> {
        return this.httpProvider.get(this.url(distTag)).do(next=> console.log("http call"))
    }

    private url(distTag: string) {
        Assert.notNullOrUndefined(distTag, 'distTag can not be null or undefined');
        return `http://registry.npmjs.org/-/package/${distTag}/dist-tags`;
    }


}
