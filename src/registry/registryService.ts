import {Dependency} from "../entity/dependency";
import {Observable} from "rxjs/Observable";
import {List} from "immutable";

export interface RegistryService {
    provide(distTag: string) : Observable<Dependency>
    provideAll(distTags: List<string>) : Observable<Dependency>
}