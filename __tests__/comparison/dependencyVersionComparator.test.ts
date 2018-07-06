import {Observable} from 'rxjs/Observable';
import 'rxjs-compat/add/observable/of';
import {NpmDependency} from '../../src/entity/npmDependency';
import {DependencyVersionComparator} from '../../src/comparison/dependencyVersionComparator';
import 'rxjs-compat/add/operator/delay';

describe('dependencyVersionEvaluator test', () => {
    test('returns expected structure', done => {
        const classUnderTest = new DependencyVersionComparator();

        const ob1 = Observable.of(
            new NpmDependency('typescript', '1.2.3'),
            new NpmDependency('node', '8.0.0'),
            new NpmDependency('abc', '1.0.0')
        );

        const ob2 = Observable.of(
            new NpmDependency('typescript', '2.9.0'),
            new NpmDependency('node', '8.0.0'),
            new NpmDependency('abc', '2.0.0')
        );

        classUnderTest.compare(ob1, ob2.delay(500)).subscribe(
            next => {
                console.log(next);
                expect(next.distTag).toBeTruthy();
                expect(next.currentVersion).not.toBe(next.latestVersion);
            },
            err => {
            },
            () => done()
        );
    });
});
