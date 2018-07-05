import {HttpProvider} from "./HttpProvider";
import * as rp from 'request-promise';
import {promisify} from "util";
import {Assert} from "../../util/assert";
import {Observable} from "rxjs/Observable";
import "rxjs-compat/add/observable/fromPromise";
import "rxjs-compat/add/observable/empty";
import {HttpResponse} from "../../entity/http/HttpResponse";

export class NodeHttpProvider<I,O> implements HttpProvider<I,Observable<O>> {
    delete(url: string): Observable<O> {
        return Observable.empty();
    }

    get(url: string): Observable<O> {
        Assert.notNullOrUndefined(url, "Url can not be null or undefined");
        const g = promisify(rp.get);
        return Observable.fromPromise(g(url))
            .map(resp => JSON.parse(resp.body))
    }

    patch(url: string, payload: I): Observable<O> {
        return Observable.empty();
    }

    post(url: string, payload: I): Observable<O> {
        return Observable.empty();
    }

    put(url: string, payload: I): Observable<O> {
        return Observable.empty();
    }


}