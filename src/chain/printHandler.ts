import {ComparisonResultHandler} from './comparisonResultHandler';
import {NdcRequest} from '../ndcRequest';
import {IO} from '../util/io';
import 'rxjs-compat/add/operator/withLatestFrom';
import 'rxjs-compat/add/operator/combineLatest';
import {ComparisonResult} from '../comparison/comparisonResult';
import {Observable} from "rxjs/Observable";
import {AbstractComparisonResultHandler} from "./abstractComparisonResultHandler";
import chalk from 'chalk';

/**
 * Prints the comparison results to stdout
 *
 * @author benjamin.krenn@leftshift.one - 7/7/18.
 * @since 0.1.0
 */
export class PrintHandler extends AbstractComparisonResultHandler {

    constructor(next?: AbstractComparisonResultHandler) {
        super(next);
    }

    doHandle(request: NdcRequest, comparisonResult: Observable<ComparisonResult>): void {
        comparisonResult.subscribe((next: ComparisonResult) => {
            IO.println(
                `${chalk.bold(next.distTag)} not up to date:
                 [ current: ${chalk.red(next.currentVersion)} | latest: ${chalk.red(next.latestVersion)}]`
            );
        });
    }

    isResponsible(request: NdcRequest): boolean {
        return true;
    }
}
