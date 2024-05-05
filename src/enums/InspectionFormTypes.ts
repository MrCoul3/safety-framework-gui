export enum InspectionFormTypes {
    //Общее
    AuditDate = 'auditDate', //Дата проверки
    InspectionForm = 'inspectionForm', //Форма проверки
    InspectionType = 'inspectionType', //Тип проверки
    Function = 'function', //Функция

    //Место проведения проверки
    OilField = 'oilField', // Месторождение
    DoStructs = 'doStructs', //Структурное подразделение ДО
    DoObjects = 'doObjects', // Объект ДО, где проводилась проверка

    //Проверяемая подрядная организация
    Contractors = 'contractors', // Наименование ПО
    TeamNumber = 'teamNumber', // Номер бригады ПО
    SubContractors = 'subContractors', // Наименование субподрядной организации
}