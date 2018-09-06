import {ComparisonResultHandler} from "./comparisonResultHandler";
import {ComparisonResult} from "../comparison/comparisonResult";
import {Observable} from "rxjs/Observable";
import {NdcRequest} from "../ndcRequest";
import {PackageJson} from "../entity/packageJson";
import {Tuple} from "../util/tuple";

/**
 * @author benjamin.krenn@leftshift.one - 7/7/18.
 * @since 0.1.0
 */
export abstract class AbstractComparisonResultHandler implements ComparisonResultHandler {

    private next?: AbstractComparisonResultHandler;

    constructor(next?: AbstractComparisonResultHandler) {
        this.next = next;
    }

    public handle(request: NdcRequest, tuple: Tuple<Observable<ComparisonResult>, Observable<PackageJson>>): void {
        if (this.isResponsible(request)) {
            this.doHandle(request, tuple);
        }
        if (this.next) {
            this.next.handle(request, tuple)
        }
    }

    public abstract isResponsible(request: NdcRequest): boolean;

    public abstract doHandle(request: NdcRequest, tuple: Tuple<Observable<ComparisonResult>, Observable<PackageJson>>): void;

}
