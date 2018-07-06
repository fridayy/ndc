import {Dependency} from '../entity/dependency';
import {Observable} from 'rxjs/Observable';
import {ComparisonResult} from './comparisonResult';
import 'rxjs-compat/add/operator/zip';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/operator/filter';
import 'rxjs-compat/add/operator/mergeMap';
import 'rxjs-compat/add/operator/withLatestFrom';
import 'rxjs-compat/add/operator/combineLatest';
import 'rxjs-compat/add/operator/do';
import {HttpProvider} from "../io/http/httpProvider";
import {Assert} from "../util/assert";

export class DependencyVersionComparator {

    private readonly httpService: HttpProvider<any, Observable<any>>;

    constructor(httpService: HttpProvider<any, Observable<any>>) {
        this.httpService = httpService;
    }

    public compare(packageJsonDependencies: Observable<Dependency>): Observable<ComparisonResult> {
        return packageJsonDependencies
            .flatMap((dependency: Dependency) => {
             return this.httpService.get(DependencyVersionComparator.url(dependency.distTag))
                .flatMap(response => {
                        return Observable.of(new ComparisonResult(
                            dependency.distTag,
                            dependency.version,
                            response.latest)
                        )
                });
        }).filter((compResult) => DependencyVersionComparator.stripSemverRangeOperator(compResult.currentVersion) !== compResult.latestVersion)
    }

    private static stripSemverRangeOperator(version: string): string {
        return version.replace(/\^|\~/, '');
    }

    private static url(distTag: string) {
        Assert.notNullOrUndefined(distTag, 'distTag can not be null or undefined');
        return `http://registry.npmjs.org/-/package/${distTag}/dist-tags`;
    }
}
