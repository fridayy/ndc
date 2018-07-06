/**
 * @author benjamin.krenn@leftshift.one - 7/7/18.
 * @since 0.1.0
 */
export class Lists {
    public static contains<T>(list: T[], obj: T): boolean {
        for (const item of list) {
            if (JSON.stringify(item) === JSON.stringify(obj)) {
                return true;
            }
        }
        return false;
    }
}
