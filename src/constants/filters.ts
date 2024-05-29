import { InspectionFormTypes } from "../enums/InspectionFormTypes";

const excludedFields = [
  InspectionFormTypes.AuditDate,
];

const expandFilterValues = Object.values(InspectionFormTypes)
  .filter((val) => !excludedFields.includes(val))
  .join(",");

export const expandFilter = `${expandFilterValues}`;
