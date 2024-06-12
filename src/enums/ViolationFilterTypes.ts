import { InspectionFormTypes } from "./InspectionFormTypes";

export enum ViolationFilterTypes {
  Date = "date",
  TypeList = "typeList", // inspectionType Тип проверки
  Orgs = "orgs", // ?
  Oilfields = "oilfields", // месторождения
  Struct = "struct", // doStruct Структурное подразделение ДО
  Obj = "obj", // doObject Объект ДО, где проводилась проверка
}

export const violationsDictionaryOfConformity = {
  [ViolationFilterTypes.TypeList]: "passport",
  [ViolationFilterTypes.Orgs]: InspectionFormTypes.Contractor,
  [ViolationFilterTypes.Oilfields]: InspectionFormTypes.OilField,
  [ViolationFilterTypes.Struct]: InspectionFormTypes.DoStruct,
  [ViolationFilterTypes.Obj]: InspectionFormTypes.DoObject,
};
