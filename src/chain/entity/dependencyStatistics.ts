/**
 * @author benjamin.krenn@leftshift.one - 7/8/18.
 * @since 1.0.0
 */
export class DependencyStatistics {
    readonly totalDependencies: number;
    readonly outdatedDependencies: number;
    readonly outdatedPercentage: number;

    constructor(totalDependencies: number, outdatedDependencies: number) {
        this.totalDependencies = totalDependencies;
        this.outdatedDependencies = outdatedDependencies;
        this.outdatedPercentage = this.calculatePercentage(totalDependencies, outdatedDependencies);
    }

    private calculatePercentage(totalDependencies: number, outdatedDependencies: number) : number {
        if (totalDependencies === 0) {
            return 0;
        }
        return Math.round(outdatedDependencies / totalDependencies * 100);
    }
}