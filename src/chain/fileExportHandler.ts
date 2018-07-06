import {AbstractComparisonResultHandler} from "./abstractComparisonResultHandler";
import {NdcRequest} from "../ndcRequest";
import {Observable} from "rxjs/Observable";
import {ComparisonResult} from "../comparison/comparisonResult";
import {IO} from "../util/io";

/**
 * Exports the comparison result and the count of outdated dependencies as ndc.result.json
 *
 * @author benjamin.krenn@leftshift.one - 7/7/18
 * @since 0.1.0
 */
export class FileExportHandler extends AbstractComparisonResultHandler {

    doHandle(request: NdcRequest, comparisonResult: Observable<ComparisonResult>): void {
        comparisonResult.reduce(((acc, value) => acc + 1), 0)
            .subscribe(val => IO.println(val.toString()));
    }

    isResponsible(request: NdcRequest): boolean {
        return request.export;
    }

}