import {DependencyVersionComparator} from "../comparison/dependencyVersionComparator";
import {DependencyFileReader} from "../io/file/dependencyFileReader";
import {NpmRegistryService} from "../registry/npm/npmRegistryService";
import {NdcRequest} from "../ndcRequest";
import {NodeHttpProvider} from "../io/http/nodeHttpProvider";
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

/**
 * @author benjamin.krenn@leftshift.one - 7/7/18.
 * @since 0.1.0
 */
export class ChainInvoker {

    public static invoke(request: NdcRequest) {
        const dependencyComparator = new DependencyVersionComparator(new NpmRegistryService(new NodeHttpProvider()));
        const fileReader = new DependencyFileReader();
        const packageJsonDependencies = fileReader.read(request.packageJsonPath || './package.json');
        const comparisonResult = dependencyComparator.compare(packageJsonDependencies).publish();
        this.abortIfEmpty(comparisonResult);

        const chain = new PrintOutdatedDependenciesHandler(new PrintStatisticsHandler(new DispatchResultHandler(undefined)));

        chain.handle(request, new DependencyResultTuple(comparisonResult, packageJsonDependencies));
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
}
