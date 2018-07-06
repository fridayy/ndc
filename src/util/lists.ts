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
