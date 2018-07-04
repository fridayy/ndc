import {NpmRegistryService} from "../../../src/registry/npm/npmRegistryService";

describe('requests', () => {

    it('works', () => {
        const classUnderTest = new NpmRegistryService();
        classUnderTest.get("abc");
    });

});