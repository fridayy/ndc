import {Dependency} from "../entity/dependency";
import {Observable} from "rxjs/Observable";
import {ComparisonResult} from "./ComparisonResult";
import "rxjs-compat/add/operator/zip";
import "rxjs-compat/add/observable/of";
import "rxjs-compat/add/operator/filter";
import "rxjs-compat/add/operator/mergeMap";

export class DependencyVersionComparator {

    public compare(packageJsonDependencies: Observable<Dependency>, npmDependencies: Observable<Dependency>): Observable<ComparisonResult> {
        return packageJsonDependencies
            .zip(npmDependencies)
            .flatMap(tuple => Observable.of(new ComparisonResult(tuple[0].distTag, tuple[0].version, tuple[1].version)))
            .filter(compResult => compResult.currentVersion != compResult.latestVersion)
    }
}