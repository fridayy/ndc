import {Dependency} from '../entity/dependency';
import {Observable} from 'rxjs/Observable';
import {List} from 'immutable';

export interface RegistryService {
    provide(dependencies: Observable<Dependency>): Observable<Dependency>;
}
