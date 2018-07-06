import {NdcRequest} from '../ndcRequest';
import {Observable} from "rxjs/Observable";
import {ComparisonResult} from "../comparison/comparisonResult";

export interface ComparisonResultHandler {
    handle(request: NdcRequest, comparisonResult: Observable<ComparisonResult>): void;
}
