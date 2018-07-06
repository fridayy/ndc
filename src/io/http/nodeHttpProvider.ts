import {HttpProvider} from './httpProvider';
import * as rp from 'request-promise';
import {Assert} from '../../util/assert';
import {Observable} from 'rxjs/Observable';
import 'rxjs-compat/add/observable/fromPromise';
import 'rxjs-compat/add/observable/empty';
import {Scheduler} from "rxjs/internal/Rx";

export class NodeHttpProvider<I, O> implements HttpProvider<I, Observable<O>> {
    public delete(url: string): Observable<O> {
        return Observable.empty();
    }

    public get(url: string): Observable<O> {
        Assert.notNullOrUndefined(url, 'Url can not be null or undefined');
        return Observable.fromPromise(rp.get(url))
            .observeOn(Scheduler.async)
            .do(next => {}, error => {console.error(error)})
            .map(resp => JSON.parse(resp));
    }

    public patch(url: string, payload: I): Observable<O> {
        return Observable.empty();
    }

    public post(url: string, payload: I): Observable<O> {
        return Observable.empty();
    }

    public put(url: string, payload: I): Observable<O> {
        return Observable.empty();
    }
}
