/**
 * @author benjamin.krenn@leftshift.one - 7/8/18.
 * @since 1.0.0
 */
import {filter} from "rxjs/operators";
import {ComparisonResult} from "../../comparison/comparisonResult";

export const versionMismatchFilter = filter((compResult : ComparisonResult) => stripSemverRangeOperator(compResult.currentVersion) !== compResult.latestVersion);
export const arrayVersionMismatchFilter = (compResult: ComparisonResult) => stripSemverRangeOperator(compResult.currentVersion) !== compResult.latestVersion;

function stripSemverRangeOperator(version: string): string {
    return version.replace(/\^|\~/, '');
}