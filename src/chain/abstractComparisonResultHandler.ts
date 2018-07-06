import {ComparisonResultHandler} from "./comparisonResultHandler";
import {ComparisonResult} from "../comparison/comparisonResult";
import {Observable} from "rxjs/Observable";
import {NdcRequest} from "../ndcRequest";

export abstract class AbstractComparisonResultHandler implements ComparisonResultHandler {

    private next?: AbstractComparisonResultHandler;


    constructor(next?: AbstractComparisonResultHandler) {
        this.next = next;
    }

    public handle(request: NdcRequest, comparisonResult: Observable<ComparisonResult>): void {
        if (this.isResponsible(request)) {
            this.doHandle(request, comparisonResult);
        }
        if (this.next) {
            this.next.handle(request, comparisonResult)
        }
    }

    abstract isResponsible(request: NdcRequest): boolean;

    abstract doHandle(request: NdcRequest, comparisonResult: Observable<ComparisonResult>): void;
}