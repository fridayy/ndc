/**
 * @author benjamin.krenn@leftshift.one - 7/7/18.
 * @since 0.1.0
 */
export interface FileWriter {
    write(path: string, content: string) : void
}