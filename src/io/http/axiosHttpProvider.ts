import {HttpProvider} from './httpProvider';
import Axios from 'axios';
import {Assert} from '../../util/assert';
import {Observable} from 'rxjs/Observable';
import 'rxjs-compat/add/observable/fromPromise';
import 'rxjs-compat/add/observable/empty';
import {Severity} from "../../util/severity";
import {IO} from "../../util/io";
import "rxjs-compat/add/operator/timeout";


/**
 * @author benjamin.krenn@leftshift.one - 7/7/18.
 * @since 0.1.0
 */
export class AxiosHttpProvider<I, O> implements HttpProvider<I, Observable<O>> {
    public delete(url: string): Observable<O> {
        return Observable.empty();
    }

    public get(url: string): Observable<O> {
        Assert.notNullOrUndefined(url, 'Url can not be null or undefined');
        return Observable.fromPromise(Axios.get(url))
            .map(resp => resp.data)
            .timeout(5000)
            .do(() => {}, error => {IO.println(`Could not GET ${url}`, Severity.ERROR)})
    }

    public patch(url: string, payload: I): Observable<O> {
        return Observable.empty();
    }

    public post(url: string, payload: I): Observable<O> {
        Assert.notNullOrUndefined(payload, 'The payload can not be null or undefined');
        return Observable.fromPromise(Axios.post(url, payload))
            .map(resp => resp.data)
            .timeout(5000)
            .do(() => {}, error => {IO.println(`Could not POST to ${url}`, Severity.ERROR)})
    }

    public put(url: string, payload: I): Observable<O> {
        return Observable.empty();
    }
}
