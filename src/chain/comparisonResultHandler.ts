import {NdcRequest} from '../ndcRequest';
import {Observable} from "rxjs/Observable";
import {ComparisonResult} from "../comparison/comparisonResult";
import {PackageJson} from "../entity/packageJson";
import {Tuple} from "../util/tuple";

/**
 * @author benjamin.krenn@leftshift.one - 7/7/18.
 * @since 0.1.0
 */
export interface ComparisonResultHandler {
    handle(request: NdcRequest, tuple: Tuple<Observable<ComparisonResult>, Observable<PackageJson>>): void;
}
