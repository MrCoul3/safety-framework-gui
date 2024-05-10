import {InspectionStatusesTypes} from "../enums/InspectionStatusesTypes";
import {CheckEntityTypes} from "../enums/CheckEntityTypes";

export interface IInspection {
    "id": string,
    "inspectionType": string,
    "oilField": string,
    "inspectionNumber": string,
    "doStructs": string,
    "auditDate": number,
    "editDate": number,
    "inspectionForm": CheckEntityTypes,
    "status": InspectionStatusesTypes
}

