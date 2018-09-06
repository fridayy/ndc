/**
 * @author benjamin.krenn@leftshift.one - 7/8/18.
 * @since 1.0.0
 */
import {ComparisonResult} from "../../comparison/comparisonResult";
import {DependencyStatistics} from "./dependencyStatistics";
import {PackageMetadata} from "./packageMetadata";

export class NdcResult {
    private readonly _results: ComparisonResult[];
    private readonly _statistics: DependencyStatistics;
    private readonly _metaInfo?: PackageMetadata;

    constructor(comparisonResults: ComparisonResult[], stats: DependencyStatistics, metadata?: PackageMetadata) {
        this._results = comparisonResults;
        this._statistics = stats;
        this._metaInfo = metadata;
    }


    get results(): ComparisonResult[] {
        return this._results;
    }

    get statistics(): DependencyStatistics {
        return this._statistics;
    }

    get metaInfo(): PackageMetadata {
        return this._metaInfo!;
    }
}
