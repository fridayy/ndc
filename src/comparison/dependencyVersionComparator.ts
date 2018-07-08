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
import {RegistryService} from "../registry/registryService";

/**
 * @author benjamin.krenn@leftshift.one - 7/7/18.
 * @since 0.1.0
 */
export class DependencyVersionComparator {

    private readonly registryService: RegistryService;

    constructor(registryService: RegistryService) {
        this.registryService = registryService;
    }

    public compare(packageJsonDependencies: Observable<Dependency>): Observable<ComparisonResult> {
        return packageJsonDependencies
            .flatMap((dependency: Dependency) => {
                return this.registryService.latestVersion(dependency.distTag)
                    .flatMap(response => {
                        return Observable.of(new ComparisonResult(
                            dependency.distTag,
                            dependency.version,
                            response.latest)
                        )
                    });
            })
    }
}
