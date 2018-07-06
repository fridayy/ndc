import {Observable} from 'rxjs/Observable';
import {NpmRegistryResponse} from "./npm/npmRegistryResponse";

/**
 * @author benjamin.krenn@leftshift.one - 7/7/18.
 * @since 0.1.0
 */
export interface RegistryService {
    latestVersion(distTag: string): Observable<NpmRegistryResponse>;
}
