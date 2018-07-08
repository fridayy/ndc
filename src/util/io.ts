import {Severity} from './severity';

/**
 * @author benjamin.krenn@leftshift.one - 7/7/18.
 * @since 0.1.0
 */
export class IO {
    public static println(message: string): void;
    public static println(message: string, severity?: Severity): void;

    public static println(message: string, severity?: Severity): void {
        if (!severity) {
            console.log(message);
        } else {
            console[severity](message);
        }
    }
}
