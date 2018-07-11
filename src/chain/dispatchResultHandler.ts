import {AbstractComparisonResultHandler} from "./abstractComparisonResultHandler";
import {NdcRequest} from "../ndcRequest";
import {DependencyResultTuple} from "./entity/dependencyResultTuple";
import {ComparisonResult} from "../comparison/comparisonResult";
import "rxjs-compat/add/operator/scan";
import {NdcResult} from "./entity/ndcResult";
import {Observable} from "rxjs/Observable";
import {arrayVersionMismatchFilter} from "./filter/versionMismatchFilter";
import {DependencyStatistics} from "./entity/dependencyStatistics";
import "rxjs-compat/add/operator/reduce";
import "rxjs-compat/add/operator/mergeMap";
import "rxjs-compat/add/operator/let";
import "rxjs-compat/add/operator/do";
import {NextObserver, PartialObserver} from "rxjs/Observer";
import {NodeHttpProvider} from "../io/http/nodeHttpProvider";
import {Objects} from "../util/objects";
import "rxjs-compat/add/observable/from";
import {IO} from "../util/io";

/**
 * @author benjamin.krenn@leftshift.one - 7/8/18.
 * @since 1.0.0
 */
export class DispatchResultHandler extends AbstractComparisonResultHandler {

    doHandle(request: NdcRequest, dependencyResultTuple: DependencyResultTuple): void {
        this.resultObservable(dependencyResultTuple.comparisonResult)
            .flatMap(result => {
                return Observable.from(request.export).flatMap(url => {
                    return new NodeHttpProvider().post(url, JSON.stringify(result))
                        .do(() => IO.println("Sending result to: " + url), err => {}, () => IO.println("Done. bye bye."));
                })
            }).subscribe()
    }

    isResponsible(request: NdcRequest): boolean {
        return true;
    }

    private outdatedDependencies(results: ComparisonResult[]): number {
        return results.filter(arrayVersionMismatchFilter).length;
    }

    private resultObservable(comparisonResult: Observable<ComparisonResult>) {
        return comparisonResult
            .reduce<ComparisonResult, ComparisonResult[]>((acc, value) => {
                acc.push(value);
                return acc
            }, [])
            .flatMap(results => Observable.of(
                new NdcResult(results, new DependencyStatistics(results.length, this.outdatedDependencies(results))))
            )
    }

}