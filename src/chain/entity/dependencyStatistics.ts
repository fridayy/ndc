/**
 * @author benjamin.krenn@leftshift.one - 7/8/18.
 * @since 1.0.0
 */
export class DependencyStatistics {
    readonly totalDependencies: number;
    readonly outdatedDependencies: number;

    constructor(totalDependencies: number, outdatedDependencies: number) {
        this.totalDependencies = totalDependencies;
        this.outdatedDependencies = outdatedDependencies;
    }
}