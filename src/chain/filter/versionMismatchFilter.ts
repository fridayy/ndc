import {filter} from "rxjs/operators";
import {ComparisonResult} from "../../comparison/comparisonResult";
import * as semver from 'semver';

/**
 * @author benjamin.krenn@leftshift.one - 7/8/18.
 * @since 1.0.0
 */
export const versionMismatchFilter = filter((compResult : ComparisonResult) => semver.gt(compResult.latestVersion, (semver.coerce(compResult.currentVersion) || {version: ""}).version));
export const arrayVersionMismatchFilter = (compResult: ComparisonResult) => semver.gt(compResult.latestVersion, (semver.coerce(compResult.currentVersion) || {version: ""}).version);