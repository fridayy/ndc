/**
 * @author benjamin.krenn@leftshift.one - 7/11/18.
 * @since 1.0.0
 */
import {PackageJsonFileReader} from "../../src/io/file/packageJsonFileReader";

describe('packageJsonFileReaderTest', () => {

    test('reads as expected', done => {
        const classUnderTest = new PackageJsonFileReader();
        classUnderTest.read("__tests__/resources/valid_package_0.json").subscribe(next => {
            expect(next.name).toBe("ndc");
            expect(next.version).toBe("0.0.0");
            expect(next.dependencies!.length).toBe(2);
            expect(next.dependencies![0].version).not.toBeUndefined();
            expect(next.dependencies![0].distTag).not.toBeUndefined();
            expect(next.devDependencies!.length).toBe(12);
            expect(next.devDependencies![0].version).not.toBeUndefined();
            expect(next.devDependencies![0].distTag).not.toBeUndefined();

            done();
        });
    });
});
