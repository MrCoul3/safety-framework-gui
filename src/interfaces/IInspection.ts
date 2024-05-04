import {CheckEntityTypes} from "../enums/CheckEntityTypes";
import {InspectionStatusesTypes} from "../enums/InspectionStatusesTypes";

export interface IInspection {
    "id": string,
    "inspectionType": string,
    "field": string,
    "inspectionNumber": string,
    "doObject": string,
    "auditDate": number,
    "editDate": number,
    "checkEntity": CheckEntityTypes,
    "status": InspectionStatusesTypes
}

