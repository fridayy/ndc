import {DependencyVersionComparator} from "../comparison/dependencyVersionComparator";
import {DependencyFileReader} from "../io/file/dependencyFileReader";
import {NpmRegistryService} from "../registry/npm/npmRegistryService";
import {NdcRequest} from "../ndcRequest";
import {NodeHttpProvider} from "../io/http/nodeHttpProvider";
import {PrintHandler} from "./printHandler";
import {FileExportHandler} from "./fileExportHandler";
import {Observable} from "rxjs/Observable";
import {ComparisonResult} from "../comparison/comparisonResult";
import {IO} from "../util/io";

export class ChainInvoker {

    public static invoke(request: NdcRequest) {
        const dependencyComparator = new DependencyVersionComparator(new NodeHttpProvider());
        const fileReader = new DependencyFileReader();
        const packageJsonDependencies = fileReader.read(request.packageJsonPath || './package.json');


        const comparisonResult = dependencyComparator.compare(packageJsonDependencies);
        this.abortIfEmpty(comparisonResult);

        const chain = new PrintHandler(new FileExportHandler(undefined));

        chain.handle(request, comparisonResult)
    }

    private static abortIfEmpty(comparisonResult: Observable<ComparisonResult>) {
        comparisonResult.isEmpty().subscribe(isEmpty => {
            if (isEmpty) {
                IO.println("Everything is up to date.");
                process.exit(0);
            }
        })
    }
}
