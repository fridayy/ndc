/**
 * @author benjamin.krenn@leftshift.one - 7/8/18.
 * @since 1.0.0
 */
import {ComparisonResult} from "../../comparison/comparisonResult";
import {DependencyStatistics} from "./dependencyStatistics";

export class NdcResult {
    readonly results: ComparisonResult[];
    readonly statistics: DependencyStatistics;

    constructor(comparisonResults: ComparisonResult[], stats: DependencyStatistics) {
        this.results = comparisonResults;
        this.statistics = stats;
    }
}