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

export class DependencyVersionComparator {
    public compare(packageJsonDependencies: Observable<Dependency>, npmDependencies: Observable<Dependency>): Observable<ComparisonResult> {
        return npmDependencies
            .zip(packageJsonDependencies)
            .flatMap(tuple =>
                Observable.of(
                    new ComparisonResult(
                        tuple[0].distTag,
                        tuple[1].version,
                        tuple[0].version
                    )
                )
            )
            .filter(
                compResult =>
                    DependencyVersionComparator.stripSemverRangeOperator(
                        compResult.currentVersion
                    ) !== compResult.latestVersion
            )
    }

    private static stripSemverRangeOperator(version: string): string {
        return version.replace(/\^|\~/, '');
    }
}
