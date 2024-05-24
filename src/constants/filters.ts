import { InspectionFormTypes } from "../enums/InspectionFormTypes";

const excludedFields = [
  InspectionFormTypes.AuditDate,
  InspectionFormTypes.InspectionForm,
];

const expandFilterValues = Object.values(InspectionFormTypes)
  .filter((val) => !excludedFields.includes(val))
  .join(",");
export const expandFilter = `${expandFilterValues}`;
