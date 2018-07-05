import {DependencyFileReader} from '../../src/io/file/dependencyFileReader';
import {marbles} from "rxjs-marbles/jest";
import "rxjs-compat/add/operator/map";
import "rxjs-compat/add/observable/interval";
import "rxjs-compat/add/operator/mergeMap";
import "rxjs-compat/add/operator/take";
import {Lists} from "../../src/util/lists";

describe('reads files and returns expected structure', () => {

    it('emits expected items', marbles(done => {
        const classUnderTest = new DependencyFileReader();
        const actual = classUnderTest.read('__tests__/resources/valid_package_0.json');

        const expectation = [
            {distTag: 'commander', version: '^2.16.0', type: 0},
            {distTag: 'immutable', version: '^3.8.2', type: 0},
            {distTag: '@types/jest', version: '^22.0.1', type: 0},
            {distTag: '@types/node', version: '^8.0.0', type: 0},
            {distTag: 'coveralls', version: '^2.0.0', type: 0},
            {distTag: 'jest', version: '^22.0.4', type: 0},
            {distTag: 'parcel', version: '^1.9.4', type: 0},
            {distTag: 'prettier', version: '^1.5.2', type: 0},
            {distTag: 'rimraf', version: '^2.0.0', type: 0},
            {distTag: 'ts-jest', version: '^22.0.1', type: 0},
            {distTag: 'ts-jest', version: '^22.0.1', type: 0},
            {distTag: 'ts-node', version: '^3.2.0', type: 0},
            {distTag: 'tslint', version: '^5.0.0', type: 0},
            {distTag: 'tslint-config-prettier', version: '^1.1.0', type: 0},
            {distTag: 'typescript', version: '^2.3.0', type: 0}
        ];

        actual.subscribe(next => {
            expect(Lists.contains(expectation, next)).toBeTruthy();
        });


    }));
});
