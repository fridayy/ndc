import {AbstractComparisonResultHandler} from "./abstractComparisonResultHandler";
import {NdcRequest} from "../ndcRequest";
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
import {AxiosHttpProvider} from "../io/http/axiosHttpProvider";
import "rxjs-compat/add/observable/from";
import {IO} from "../util/io";
import {PackageJson} from "../entity/packageJson";
import {Tuple} from "../util/tuple";
import {Objects} from "../util/objects";
import {PackageMetadata} from "./entity/packageMetadata";

/**
 * @author benjamin.krenn@leftshift.one - 7/8/18.
 * @since 1.0.0
 */
export class DispatchResultHandler extends AbstractComparisonResultHandler {

    doHandle(request: NdcRequest, tuple: Tuple<Observable<ComparisonResult>, Observable<PackageJson>>): void {
        this.resultObservable(tuple)
            .flatMap(result => {
                return Observable.from(request.export).flatMap(url => {
                    return new AxiosHttpProvider().post(url, result)
                        .do(() => IO.println("Sending result to: " + url));
                })
            }).subscribe()
    }

    isResponsible(request: NdcRequest): boolean {
        return !Objects.isNullOrUndefined(request.export);
    }

    private outdatedDependencies(results: ComparisonResult[]): number {
        return results.filter(arrayVersionMismatchFilter).length;
    }

    private resultObservable(tuple: Tuple<Observable<ComparisonResult>, Observable<PackageJson>>) {
        return tuple.left
            .reduce<ComparisonResult, ComparisonResult[]>((acc, value) => {
                acc.push(value);
                return acc
            }, [])
            .zip(tuple.right)
            .flatMap(tuple => Observable.of(
                new NdcResult(tuple[0], new DependencyStatistics(tuple.length, this.outdatedDependencies(tuple[0])),
                    new PackageMetadata(tuple[1].name || "", tuple[1].version || "")))
            )
    }

}