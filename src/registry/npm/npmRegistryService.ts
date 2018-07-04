import {RegistryService} from "../registryService";
import {Dependency, DependencyType} from "../../entity/dependency";
import * as rp from 'request-promise';
import {NpmDependency} from "../../entity/npmDependency";
import {IO} from "../../util/io";
import {Severity} from "../../util/severity";
import {Objects} from "../../util/objects";
import {Assert} from "../../util/assert";

export class NpmRegistryService implements RegistryService {

    async get(distTag: string): Promise<Dependency> {
        const resp = await rp.get(this.url(distTag))
            .catch(err => IO.println(`Unknown dist tag: ${distTag}`, Severity.ERROR));

        if (!Objects.isNullOrUndefined(resp)) {
            const json = JSON.parse(resp);
            return new NpmDependency(distTag, json.latest, DependencyType.RUNTIME);
        }
        throw Error(`Unknown dist tag: ${distTag}. Check your package.json`);
    }

    private url(distTag: string) {
        Assert.notNullOrUndefined(distTag, 'distTag can not be null or undefined');
        return `'http://registry.npmjs.org/-/package/${distTag}/dist-tags'`
    }
}