import {NdcRequest} from '../ndcRequest';
import {Observable} from "rxjs/Observable";
import {ComparisonResult} from "../comparison/comparisonResult";
import {DependencyResultTuple} from "./entity/dependencyResultTuple";

/**
 * @author benjamin.krenn@leftshift.one - 7/7/18.
 * @since 0.1.0
 */
export interface ComparisonResultHandler {
    handle(request: NdcRequest, dependencyResultTuple: DependencyResultTuple): void;
}
