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
  TeamNumber = "teamNumber", // Номер бригады ПО
  SubContractors = "subContractors", // Наименование субподрядной организации

  // Участники инспекции

  // ФИО составителя акта ?
  // ФИО проверяемого ?
  // ФИО супервайзера ?
}

export enum InspectionFormGroups {
  Common = "common",
  InspectionPlace = "inspectionPlace",
  ContractorUnderReview = "contractorUnderReview",
  InspectionParticipants = "inspectionParticipants",
}
