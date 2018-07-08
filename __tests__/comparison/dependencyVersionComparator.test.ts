import {Observable} from 'rxjs/Observable';
import 'rxjs-compat/add/observable/of';
import {NpmDependency} from '../../src/entity/npmDependency';
import {DependencyVersionComparator} from '../../src/comparison/dependencyVersionComparator';
import 'rxjs-compat/add/operator/delay';
import {HttpProvider} from "../../src/io/http/httpProvider";
import {RegistryService} from "../../src/registry/registryService";
import {NpmRegistryResponse} from "../../src/registry/npm/npmRegistryResponse";

describe('dependencyVersionComparator test', () => {
    test('returns expected structure', done => {
        const classUnderTest = new DependencyVersionComparator(new MockedRegistryService());

        const ob1 = Observable.of(
            new NpmDependency('typescript', '1.2.3'),
            new NpmDependency('node', '8.0.0'),
            new NpmDependency('abc', '1.0.0')
        );

        classUnderTest.compare(ob1).subscribe(
            next => {
                expect(next.distTag).toBeTruthy();
                expect(next.latestVersion).toBe("1.2.3")
            },
            err => {
            },
            () => done());
    });
});

class MockedRegistryService implements RegistryService {
    latestVersion(distTag: string): Observable<NpmRegistryResponse> {
        return Observable.of({latest: "1.2.3"})
    }

}