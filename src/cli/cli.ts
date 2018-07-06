import {Command} from 'commander';
import {ChainInvoker} from "../chain/chainInvoker";
import {NdcRequest} from "../ndcRequest";

export class Cli {
    /**
     * Initializes the cli
     */
    public static initialize(): void {
        const requestBuilder = NdcRequest.builder();
        const c = new Command();
        c.version('0.1.0')
            .option('-p', 'Path to package json')
            .action((path => { requestBuilder.withPackageJsonPath(path) }))
            .option('-e', 'enables export')
            .parse(process.argv);

        ChainInvoker.invoke(requestBuilder.build())
    }
}
