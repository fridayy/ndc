/**
 * @author benjamin.krenn@leftshift.one - 7/11/18.
 * @since 1.0.0
 */
export class Tuple<L,R> {
    readonly left: L;
    readonly right: R;

    constructor(left: L, right: R) {
        this.left = left;
        this.right = right;
    }
}