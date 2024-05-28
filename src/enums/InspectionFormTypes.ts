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
  Auditee = 'auditee',// ФИО проверяемого ?
  Supervisor = "supervisor", // ФИО супервайзера ?

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