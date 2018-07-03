import {FileReader} from "./fileReader";
import {Dependency} from "../entity/dependency";
import {Set} from "immutable";
import * as fs from "fs";
import {Assert} from "../util/assert";

export class DependencyFileReader implements FileReader<Set<Dependency>> {
    public read(path: string): Set<Dependency> {
        Assert.notNullOrUndefined(path, "Path to package.json can not be null or undefined");
        fs.readFile(path, (err, data) => {
            console.log(data);
        });
        return Set();
    }
}