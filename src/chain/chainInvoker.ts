import {DependencyVersionComparator} from "../comparison/dependencyVersionComparator";
import {DependencyFileReader} from "../io/file/dependencyFileReader";
import {NpmRegistryService} from "../registry/npm/npmRegistryService";
import {NdcRequest} from "../ndcRequest";
import {AxiosHttpProvider} from "../io/http/axiosHttpProvider";
import {PrintOutdatedDependenciesHandler} from "./printOutdatedDependenciesHandler";
import {PrintStatisticsHandler} from "./printStatisticsHandler";
import {Observable} from "rxjs/Observable";
import {ComparisonResult} from "../comparison/comparisonResult";
import {IO} from "../util/io";
import chalk from 'chalk';
import "rxjs-compat/add/operator/publish";
import "rxjs-compat/add/operator/isEmpty";
import {DependencyResultTuple} from "./entity/dependencyResultTuple";
import {DispatchResultHandler} from "./dispatchResultHandler";
import {PackageJsonFileReader} from "../io/file/packageJsonFileReader";
import {PackageJson} from "../entity/packageJson";
import "rxjs-compat/add/observable/of";
import {Dependency} from "../entity/dependency";
import "rxjs-compat/add/operator/merge";
import {Tuple} from "../util/tuple";

/**
 * @author benjamin.krenn@leftshift.one - 7/7/18.
 * @since 0.1.0
 */
export class ChainInvoker {

    public static invoke(request: NdcRequest) {
        const dependencyComparator = new DependencyVersionComparator(new NpmRegistryService(new AxiosHttpProvider()));
        const fileReader = new PackageJsonFileReader();
        const packageJson = fileReader.read(request.packageJsonPath || './package.json');
        const comparisonResult = dependencyComparator.compare(this.toDependencies(packageJson)).publish();
        this.abortIfEmpty(comparisonResult);

        const chain = new PrintOutdatedDependenciesHandler(new PrintStatisticsHandler(new DispatchResultHandler(undefined)));

        chain.handle(request, new Tuple<Observable<ComparisonResult>, Observable<PackageJson>>(comparisonResult, packageJson));
        comparisonResult.connect()
    }

    private static abortIfEmpty(comparisonResult: Observable<ComparisonResult>) {
        comparisonResult.isEmpty().subscribe(isEmpty => {
            if (isEmpty) {
                IO.println(`${chalk.greenBright('Everything is up to date.')}`);
                process.exit(0);
            }
        })
    }

    private static toDependencies(packageJsonObservable: Observable<PackageJson>) : Observable<Dependency> {
        return packageJsonObservable
            .flatMap(pkgJson => {
                return Observable.from(pkgJson.dependencies || []).merge(Observable.from(pkgJson.devDependencies || []))
            });
    }
}
