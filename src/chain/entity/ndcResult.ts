/**
 * @author benjamin.krenn@leftshift.one - 7/8/18.
 * @since 1.0.0
 */
import {ComparisonResult} from "../../comparison/comparisonResult";
import {DependencyStatistics} from "./dependencyStatistics";
import {PackageMetadata} from "./packageMetadata";

export class NdcResult {
    readonly results: ComparisonResult[];
    readonly statistics: DependencyStatistics;
    readonly metadata?: PackageMetadata;

    constructor(comparisonResults: ComparisonResult[], stats: DependencyStatistics, metadata?: PackageMetadata) {
        this.results = comparisonResults;
        this.statistics = stats;
        this.metadata = metadata;
    }
}