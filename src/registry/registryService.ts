import {Dependency} from '../entity/dependency';
import {Observable} from 'rxjs/Observable';
import {List} from 'immutable';
import {NpmRegistryResponse} from "./npm/npmRegistryResponse";

export interface RegistryService {
    latestVersion(distTag: string): Observable<NpmRegistryResponse>;
}
