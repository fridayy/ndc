import {Severity} from './severity';

export class IO {
    public static println(message: string): void;

    public static println(message: string, severity?: Severity): void {
        if (!severity) {
            console.log(message);
        } else {
            console[severity](message);
        }
    }
}
