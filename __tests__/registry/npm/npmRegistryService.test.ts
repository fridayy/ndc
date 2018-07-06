import {NpmRegistryService} from '../../../src/registry/npm/npmRegistryService';
import {HttpProvider} from '../../../src/io/http/httpProvider';
import {Observable} from 'rxjs/Observable';
import 'rxjs-compat/add/observable/of';
import {List} from 'immutable';
import {Lists} from '../../../src/util/lists';
import {NpmDependency} from '../../../src/entity/npmDependency';

describe('requests', () => {
    test('provides expected result', done => {
        const classUnderTest = new NpmRegistryService(new MockedHttpProvider());
        classUnderTest.latestVersion('abc').subscribe(next => {
            expect(next.latest).toBe('1.2.3');
            done();
        });
    });
});

class MockedHttpProvider implements HttpProvider<any, any> {
    delete(url: string): any {
        return undefined;
    }

    get(url: string): any {
        return Observable.of({latest: '1.2.3'});
    }

    patch(url: string, payload: any): any {
        return undefined;
    }

    post(url: string, payload: any): any {
        return undefined;
    }

    put(url: string, payload: any): any {
        return undefined;
    }
}
