/**
 * @author benjamin.krenn@leftshift.one - 7/8/18.
 * @since 1.0.0
 */
import {Observable} from "rxjs/Observable";
import {ComparisonResult} from "../../comparison/comparisonResult";
import {Dependency} from "../../entity/dependency";

export class DependencyResultTuple {
    readonly comparisonResult: Observable<ComparisonResult>;
    readonly packageJsonDependencies: Observable<Dependency>;

    constructor(comparisonResult: Observable<ComparisonResult>, packageJsonDependencies: Observable<Dependency>) {
        this.comparisonResult = comparisonResult;
        this.packageJsonDependencies = packageJsonDependencies;
    }
}