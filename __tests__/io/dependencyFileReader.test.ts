import {DependencyFileReader} from '../../src/io/dependencyFileReader';
import {DependencyType} from "../../src/entity/dependency";

describe('reads files and returns expected structure', () => {
    it('reads __tests__/resources/valid_package_0.json and returns the expected structure', () => {
        const classUnderTest = new DependencyFileReader();

        return classUnderTest.read('__tests__/resources/valid_package_0.json')
            .then(actual => {
                expect(actual.size).toBe(14);
                expect(actual.filter(it => it.type == DependencyType.RUNTIME).size).toBe(2);
                expect(actual.filter(it => it.type == DependencyType.DEV).size).toBe(12);
            });
    });

    it('reads __tests__/resources/valid_package_1.json and returns the expected structure', () => {
        const classUnderTest = new DependencyFileReader();

        return classUnderTest.read('__tests__/resources/valid_package_1.json')
            .then(actual => {
                expect(actual.size).toBe(2);
                expect(actual.filter(it => it.type == DependencyType.RUNTIME).size).toBe(2);
                expect(actual.filter(it => it.type == DependencyType.DEV).size).toBe(0);
            });
    });

    it('reads __tests__/resources/valid_package_2.json and returns the expected structure', () => {
        const classUnderTest = new DependencyFileReader();

        return classUnderTest.read('__tests__/resources/valid_package_2.json')
            .then(actual => {
                expect(actual.size).toBe(2);
                expect(actual.filter(it => it.type == DependencyType.RUNTIME).size).toBe(2);
                expect(actual.filter(it => it.type == DependencyType.DEV).size).toBe(0);
            });
    });

    it('reads __tests__/resources/valid_package_3.json and returns the expected structure', () => {
        const classUnderTest = new DependencyFileReader();

        return classUnderTest.read('__tests__/resources/valid_package_3.json')
            .then(actual => {
                expect(actual.size).toBe(0);
            });
    });
});

