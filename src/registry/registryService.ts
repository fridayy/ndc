import {Dependency} from "../entity/dependency";

export interface RegistryService {
    get(distTag: string) : Promise<Dependency>
}