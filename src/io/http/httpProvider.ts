/**
 * @author benjamin.krenn@leftshift.one - 7/7/18.
 * @since 0.1.0
 */
export interface HttpProvider<I, O> {
    get(url: string): O;

    put(url: string, payload: I): O;

    delete(url: string): O;

    post(url: string, payload: I): O;

    patch(url: string, payload: I): O;
}
