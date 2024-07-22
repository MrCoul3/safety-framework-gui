import {InspectionFormTypes} from "../enums/InspectionFormTypes";

export type sortOrder = "asc" | "desc"

export interface ISortByParams {
  sortingBy: InspectionFormTypes;
  sortOrder: sortOrder,
}
