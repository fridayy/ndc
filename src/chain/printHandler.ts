import {ComparisonResultHandler} from './comparisonResultHandler';
import {NdcRequest} from '../ndcRequest';
import {IO} from '../util/io';
import 'rxjs-compat/add/operator/withLatestFrom';
import 'rxjs-compat/add/operator/combineLatest';
import {ComparisonResult} from '../comparison/comparisonResult';
import {Observable} from "rxjs/Observable";
import {AbstractComparisonResultHandler} from "./abstractComparisonResultHandler";

export class PrintHandler extends AbstractComparisonResultHandler {

    constructor(next?: AbstractComparisonResultHandler) {
        super(next);
    }

    doHandle(request: NdcRequest, comparisonResult: Observable<ComparisonResult>): void {
        comparisonResult.subscribe((next: ComparisonResult) => {
            IO.println(
                `${next.distTag} not up to date: [ current: ${next.currentVersion} | latest: ${next.latestVersion}]`
            );
        });
    }

    isResponsible(request: NdcRequest): boolean {
        return true;
    }
}
