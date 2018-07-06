import {Observable} from 'rxjs/Observable';
import 'rxjs-compat/add/observable/of';
import {NpmDependency} from '../../src/entity/npmDependency';
import {DependencyVersionComparator} from '../../src/comparison/dependencyVersionComparator';
import 'rxjs-compat/add/operator/delay';
import {HttpProvider} from "../../src/io/http/httpProvider";

describe('dependencyVersionEvaluator test', () => {
    test('returns expected structure', done => {
        const classUnderTest = new DependencyVersionComparator(new MockedHttpProvider());

        const ob1 = Observable.of(
            new NpmDependency('typescript', '1.2.3'),
            new NpmDependency('node', '8.0.0'),
            new NpmDependency('abc', '1.0.0')
        );

        classUnderTest.compare(ob1).subscribe(
            next => {
                console.log(next);
                expect(next.distTag).toBeTruthy();
                expect(next.currentVersion).not.toBe(next.latestVersion);
            },
            err => {
            },
            () => done());
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