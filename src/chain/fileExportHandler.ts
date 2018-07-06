import {AbstractComparisonResultHandler} from "./abstractComparisonResultHandler";
import {NdcRequest} from "../ndcRequest";
import {Observable} from "rxjs/Observable";
import {ComparisonResult} from "../comparison/comparisonResult";

export class FileExportHandler extends AbstractComparisonResultHandler {

    doHandle(request: NdcRequest, comparisonResult: Observable<ComparisonResult>): void {
    }

    isResponsible(request: NdcRequest): boolean {
        return request.export;
    }

}