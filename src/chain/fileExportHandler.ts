import {AbstractComparisonResultHandler} from "./abstractComparisonResultHandler";
import {NdcRequest} from "../ndcRequest";
import {Observable} from "rxjs/Observable";
import {ComparisonResult} from "../comparison/comparisonResult";
import {IO} from "../util/io";

export class FileExportHandler extends AbstractComparisonResultHandler {

    doHandle(request: NdcRequest, comparisonResult: Observable<ComparisonResult>): void {
        comparisonResult.subscribe(next =>
            IO.println("EXPORT: " + next)
        )
    }

    isResponsible(request: NdcRequest): boolean {
        return request.export;
    }

}