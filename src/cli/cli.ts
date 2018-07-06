import {Command} from 'commander';
import {ChainInvoker} from "../chain/chainInvoker";
import {NdcRequest} from "../ndcRequest";

/**
 * @author benjamin.krenn@leftshift.one - 7/7/18.
 * @since 0.1.0
 */
export class Cli {
    /**
     * Initializes the cli
     */
    public static initialize(): void {
        const requestBuilder = NdcRequest.builder();
        const c = new Command();
        c.version('0.1.0')
            .option('-p, --path <value>', 'Path to package json')
            .option('-e, --export', 'enables export')
            .parse(process.argv);

        requestBuilder.withPackageJsonPath(c.path);
        requestBuilder.withExport(c.export);
        ChainInvoker.invoke(requestBuilder.build())
    }
}
