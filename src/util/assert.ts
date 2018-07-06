/**
 * @author benjamin.krenn@leftshift.one - 7/7/18.
 * @since 0.1.0
 */
export class Assert {
    public static notNullOrUndefined<T>(obj: T, message: string): void {
        if (obj === undefined || obj === null) {
            throw new Error(message);
        }
    }
}
