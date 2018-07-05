export class Lists {
    public static contains<T>(list: Array<T>, obj: T): boolean {
        for (let i = 0; i < list.length; i++) {
            if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
                return true
            }
        }
        return false;
    }
}