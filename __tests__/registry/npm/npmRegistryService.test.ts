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
        classUnderTest.provide('abc').subscribe(next => {
            expect(next.version).toBe('1.2.3');
            expect(next.distTag).toBe('abc');
            done();
        });
    });

    test('provideAll', done => {
        const classUnderTest = new NpmRegistryService(new MockedHttpProvider());

        const tags = List(['a', 'b', 'c']);

        classUnderTest.provideAll(tags).subscribe(
            next => {
                expect(Lists.contains(tags.toArray(), next.distTag)).toBeTruthy();
            },
            err => {
            },
            () => done()
        );
    });

    test('provideObs', done => {
        const classUnderTest = new NpmRegistryService(new MockedHttpProvider());

        const obs = Observable.of(
            new NpmDependency('abc', '1.0.0'),
            new NpmDependency('xyz', '3.2.1')
        );

        classUnderTest
            .provideObs(obs)
            .subscribe(next => expect(next.version).toBe('1.2.3'));
        done();
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
