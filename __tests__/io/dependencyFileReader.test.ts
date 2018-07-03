import {DependencyFileReader} from "../../src/io/dependencyFileReader";

it('reads file as expected', () => {
    const classUnderTest = new DependencyFileReader();
    classUnderTest.read("/home/bnjm/IdeaProjects/ndc/package.json")
});