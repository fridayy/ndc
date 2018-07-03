export class Assert {

    public static notNullOrUndefined<T>(obj: T, message: string) : void {
        if (obj === undefined || obj === null) {
            throw new Error(message)
        }
    }
}