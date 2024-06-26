import { InspectionFormTypes } from "./InspectionFormTypes";

export enum ViolationFilterTypes {
  Date = "date",
  TypeList = "typeList", // inspectionType паспорта
  Orgs = "orgs", // ?
  Oilfields = "oilfields", // месторождения
  Struct = "struct", // doStruct Структурное подразделение ДО
  Obj = "obj", // doObject Объект ДО, где проводилась проверка
}
export const VIOLATIONS_COMMON_FIELDS = [
  InspectionFormTypes.AuditDate,
  "passport",
  "auditor",
  "auditee",
  InspectionFormTypes.DoStruct,
  "question",
];

export const violationsDictionaryOfConformity = {
  [ViolationFilterTypes.TypeList]: "passport",
  [ViolationFilterTypes.Orgs]: InspectionFormTypes.Contractor,
  [ViolationFilterTypes.Oilfields]: InspectionFormTypes.OilField,
  [ViolationFilterTypes.Struct]: InspectionFormTypes.DoStruct,
  [ViolationFilterTypes.Obj]: InspectionFormTypes.DoObject,
};
