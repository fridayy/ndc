import {RegistryService} from "../registryService";
import {Dependency} from "../../entity/dependency";
import {NpmDependency} from "../../entity/npmDependency";
import {Assert} from "../../util/assert";
import {Observable} from "rxjs/Observable";
import "rxjs-compat/add/observable/fromPromise";
import "rxjs-compat/add/operator/map";
import "rxjs-compat/add/operator/do";
import {HttpProvider} from "../../io/http/HttpProvider";
import {List} from "immutable";
import "rxjs-compat/add/observable/from";
import "rxjs-compat/add/operator/mergeMap";

export class NpmRegistryService implements RegistryService {

    private readonly httpProvider: HttpProvider<any, Observable<Dependency>>;

    constructor(httpProvider: HttpProvider<any, Observable<Dependency>>) {
        this.httpProvider = httpProvider;
    }

    public provide(distTag: string): Observable<Dependency> {
        return this.httpProvider.get(NpmRegistryService.url(distTag))
            .map(json => new NpmDependency(distTag, json.latest));
    }

    public provideAll(distTags: List<string>): Observable<Dependency> {
        return Observable.from(distTags.toArray())
            .flatMap(tag => this.provide(tag))
    }

    private static url(distTag: string) {
        Assert.notNullOrUndefined(distTag, 'distTag can not be null or undefined');
        return `http://registry.npmjs.org/-/package/${distTag}/dist-tags`
    }

}