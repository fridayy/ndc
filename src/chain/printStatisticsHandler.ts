import {AbstractComparisonResultHandler} from "./abstractComparisonResultHandler";
import {NdcRequest} from "../ndcRequest";
import {Observable} from "rxjs/Observable";
import {ComparisonResult} from "../comparison/comparisonResult";
import {IO} from "../util/io";
import "rxjs-compat/add/operator/reduce";
import {DependencyResultTuple} from "./entity/dependencyResultTuple";
import {versionMismatchFilter} from "./filter/versionMismatchFilter";
import "rxjs-compat/add/operator/let";
import {PackageJson} from "../entity/packageJson";
import {Tuple} from "../util/tuple";
import "rxjs-compat/add/operator/do";

/**
 * Exports the comparison result and the count of outdated dependencies as ndc.result.json
 *
 * @author benjamin.krenn@leftshift.one - 7/7/18
 * @since 0.1.0
 */
export class PrintStatisticsHandler extends AbstractComparisonResultHandler {

    doHandle(request: NdcRequest, tuple: Tuple<Observable<ComparisonResult>, Observable<PackageJson>>): void {
        tuple.left.reduce(((acc, value) => acc + 1), 0)
            .subscribe(val => IO.println(`Total Dependencies: ${val.toString()}`));

        tuple.left.let(versionMismatchFilter)
            .reduce(((acc, value) => acc + 1), 0)
            .subscribe(val => IO.println(`Outdated Dependencies: ${val.toString()}`));
    }

    isResponsible(request: NdcRequest): boolean {
        return request.printStats;
    }
}