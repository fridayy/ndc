import {NdcRequest} from '../ndcRequest';
import {IO} from '../util/io';
import 'rxjs-compat/add/operator/withLatestFrom';
import 'rxjs-compat/add/operator/combineLatest';
import {ComparisonResult} from '../comparison/comparisonResult';
import {AbstractComparisonResultHandler} from "./abstractComparisonResultHandler";
import chalk from 'chalk';
import {DependencyResultTuple} from "./entity/dependencyResultTuple";
import {versionMismatchFilter} from "./filter/versionMismatchFilter";
import "rxjs-compat/add/operator/let";
import {Observable} from "rxjs/Observable";
import {PackageJson} from "../entity/packageJson";
import {Tuple} from "../util/tuple";

/**
 * Prints the comparison results to stdout
 *
 * @author benjamin.krenn@leftshift.one - 7/7/18.
 * @since 0.1.0
 */
export class PrintOutdatedDependenciesHandler extends AbstractComparisonResultHandler {

    constructor(next?: AbstractComparisonResultHandler) {
        super(next);
    }

    doHandle(request: NdcRequest, tuple: Tuple<Observable<ComparisonResult>, Observable<PackageJson>>): void {
        tuple.left
            .let(versionMismatchFilter)
            .subscribe((next: ComparisonResult) => {
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
