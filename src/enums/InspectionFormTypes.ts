import {FreeFormFieldTypes, FreeFormTypes} from "./FreeFormTypes";

export enum InspectionFormTypes {
  //Общее
  AuditDate = "auditDate", //Дата проверки
  InspectionForm = "inspectionFormType", //Форма проверки
  InspectionType = "inspectionType", //Тип проверки
  Function = "function", //Функция

  //Место проведения проверки
  OilField = "oilfield", // Месторождение
  DoStruct = "doStruct", //Структурное подразделение ДО
  DoObject = "doObject", // Объект ДО, где проводилась проверка

  //Проверяемая подрядная организация
  Contractor = "contractor", // Наименование ПО
  ContractorStruct = "contractorStruct", // Номер бригады ПО
  SubContractor = "subContractor", // Наименование субподрядной организации

  // Участники инспекции

  Auditor = "auditor", // ФИО составителя акта ?
  Auditee = "auditee", // ФИО проверяемого ?
  Supervisor = "supervisor", // ФИО супервайзера ?
}

export enum InspectionFormDictTypes {
  //Общее
  AuditDates = "auditDates", //Дата проверки
  InspectionForms = "inspectionFormTypes", //Форма проверки
  InspectionTypes = "inspectionTypes", //Тип проверки
  Functions = "functions", //Функция

  //Место проведения проверки
  OilFields = "oilfields", // Месторождение
  DoStructs = "doStructs", //Структурное подразделение ДО
  DoObjects = "doObjects", // Объект ДО, где проводилась проверка

  //Проверяемая подрядная организация
  Contractors = "contractors", // Наименование ПО
  ContractorStructs = "contractorStructs", // Номер бригады ПО
  SubContractors = "subContractors", // Наименование субподрядной организации

  // Участники инспекции

  Auditors = "auditors", // ФИО составителя акта ?
  Auditees = "auditees", // ФИО проверяемого ?
  Supervisors = "supervisors", // ФИО супервайзера ?
}

export enum InspectionFormGroups {
  Common = "common",
  InspectionPlace = "inspectionPlace",
  ContractorUnderReview = "contractorUnderReview",
  InspectionParticipants = "inspectionParticipants",
}

export const EMPLOYEES = [
  InspectionFormTypes.Auditor,
  InspectionFormTypes.Auditee,
  InspectionFormTypes.Supervisor,
];
export const INSPECTION_FORM_COMMON_FIELDS = Object.values(InspectionFormTypes);

export const INSPECTION_FORM_NOT_REQUIRED_FIELDS = [
  InspectionFormTypes.Contractor,
  InspectionFormTypes.SubContractor,
  InspectionFormTypes.Supervisor,
  InspectionFormTypes.ContractorStruct,
];
export const INSPECTION_FORM_REQUIRED_FIELDS =
  INSPECTION_FORM_COMMON_FIELDS.filter(
    (field) => !INSPECTION_FORM_NOT_REQUIRED_FIELDS.includes(field),
  );

export const inspectionFieldsDictNames = {
  [InspectionFormTypes.AuditDate]: InspectionFormDictTypes.AuditDates,
  [InspectionFormTypes.InspectionForm]: InspectionFormDictTypes.InspectionForms,
  [InspectionFormTypes.InspectionType]: InspectionFormDictTypes.InspectionTypes,
  [InspectionFormTypes.Function]: InspectionFormDictTypes.Functions,
  [InspectionFormTypes.OilField]: InspectionFormDictTypes.OilFields,
  [InspectionFormTypes.DoStruct]: InspectionFormDictTypes.DoStructs,
  [InspectionFormTypes.DoObject]: InspectionFormDictTypes.DoObjects,
  [InspectionFormTypes.Contractor]: InspectionFormDictTypes.Contractors,
  [InspectionFormTypes.ContractorStruct]: InspectionFormDictTypes.ContractorStructs,
  [InspectionFormTypes.SubContractor]: InspectionFormDictTypes.SubContractors,
  [InspectionFormTypes.Auditor]: InspectionFormDictTypes.Auditors,
  [InspectionFormTypes.Auditee]: InspectionFormDictTypes.Auditees,
  [InspectionFormTypes.Supervisor]: InspectionFormDictTypes.Supervisors,
}
