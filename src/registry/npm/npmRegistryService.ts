import {RegistryService} from '../registryService';
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
import "rxjs-compat/add/operator/startWith";

/**
 * @author benjamin.krenn@leftshift.one - 7/7/18.
 * @since 0.1.0
 */
export class NpmRegistryService implements RegistryService {
    private readonly httpProvider: HttpProvider<any,
        Observable<NpmRegistryResponse>>;

    constructor(httpProvider: HttpProvider<any, Observable<NpmRegistryResponse>>) {
        this.httpProvider = httpProvider;
    }

    public latestVersion(distTag: string): Observable<NpmRegistryResponse> {
        return this.httpProvider.get(NpmRegistryService.url(distTag))
    }

    private static url(distTag: string) : string {
        Assert.notNullOrUndefined(distTag, 'distTag can not be null or undefined');
        return `http://registry.npmjs.org/-/package/${distTag}/dist-tags`;
    }


}
