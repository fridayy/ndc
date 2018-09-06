/**
 * @author benjamin.krenn@leftshift.one - 7/8/18.
 * @since 0.1.0
 */
export class DependencyStatistics {
    private readonly _totalDependencies: number;
    private readonly _outdatedDependencies: number;
    private readonly _outdatedPercentage: number;

    constructor(totalDependencies: number, outdatedDependencies: number) {
        this._totalDependencies = totalDependencies;
        this._outdatedDependencies = outdatedDependencies;
        this._outdatedPercentage = this.calculatePercentage(totalDependencies, outdatedDependencies);
    }

    private calculatePercentage(totalDependencies: number, outdatedDependencies: number): number {
        if (totalDependencies === 0) {
            return 0;
        }
        return Math.round(outdatedDependencies / totalDependencies * 100);
    }

    get totalDependencies(): number {
        return this._totalDependencies;
    }

    get outdatedDependencies(): number {
        return this._outdatedDependencies;
    }

    get outdatedPercentage(): number {
        return this._outdatedPercentage;
    }
}
