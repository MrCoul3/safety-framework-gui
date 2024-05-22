export enum InspectionFormTypes {
  //Общее
  AuditDate = "auditDate", //Дата проверки
  InspectionForm = "inspectionFormTypes", //Форма проверки
  InspectionType = "inspectionType", //Тип проверки
  Function = "function", //Функция

  //Место проведения проверки
  OilField = "oilField", // Месторождение
  DoStructs = "doStructs", //Структурное подразделение ДО
  DoObjects = "doObjects", // Объект ДО, где проводилась проверка

  //Проверяемая подрядная организация
  Contractors = "contractors", // Наименование ПО
  ContractorStructs = "contractorStructs", // Номер бригады ПО
  SubContractors = "subContractors", // Наименование субподрядной организации

  // Участники инспекции

  Auditor = "auditor", // ФИО составителя акта ?
  Auditee = 'auditee',// ФИО проверяемого ?
  Supervisor = "supervisor"// ФИО супервайзера ?
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