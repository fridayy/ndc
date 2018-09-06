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
 * Dispatches the dependency check result json to the given URLs
 * @author benjamin.krenn@leftshift.one - 7/8/18.
 * @since 0.1.0
 */
export class DispatchResultHandler extends AbstractComparisonResultHandler {

    public doHandle(request: NdcRequest, tuple: Tuple<Observable<ComparisonResult>, Observable<PackageJson>>): void {
        this.resultObservable(tuple)
            .flatMap(result => {
                return Observable.from(request.export).flatMap(url => {
                    return new AxiosHttpProvider().post(url, result)
                        .do(() => IO.println("Sending result to: " + url));
                })
            }).subscribe()
    }

    public isResponsible(request: NdcRequest): boolean {
        return !Objects.isNullOrUndefined(request.export);
    }

    private outdatedDependencies(results: ComparisonResult[]): ComparisonResult[] {
        return results.filter(arrayVersionMismatchFilter);
    }

    private resultObservable(tuple: Tuple<Observable<ComparisonResult>, Observable<PackageJson>>) {
        return tuple.left
            .reduce<ComparisonResult, ComparisonResult[]>((acc, value) => {
                acc.push(value);
                return acc
            }, [])
            .zip(tuple.right)
            .flatMap(_ => Observable.of(
                new NdcResult(this.outdatedDependencies(_[0]),
                    new DependencyStatistics(_[0].length, this.outdatedDependencies(_[0]).length),
                    new PackageMetadata(_[1].name || "", _[1].version || "")))
            )
    }
}
