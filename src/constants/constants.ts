import { InspectionFormTypes } from "../enums/InspectionFormTypes";

export const includedFunctionTitlesForContractorStruct = [
  "Бурение",
  "Внутрискважинные работы(ВСР)",
  "ГРП",
];

// 1.Бурение, ВСР, ГРП, КС:
//   a.Наим ПО,№ бригады, ФИО супера – обязательно.
//    Contractor Supervisor ContractorStruct
//    Поля не блокируются
export const firstCaseOfIncludedFunctionTitles = [
  "Бурение",
  "Внутрискважинные работы(ВСР)",
  "ГРП",
  "Кап.Строительство",
];

// 2.Газ, Добыча, транспорт, энергетики, автоматизация
//    a. транспорт, энергетики, автоматизация: Наимен ПО – обязательно.
//    b.Добыча, Газ: наим ПО, № бригады – необязательно, не блокируем.При выборе ПО - № бригады - обязательно
//    c.Транспорт, автомат, энергетики: наимен ПО – обязат, № бригады заблокирован
//    d.ФИО супер - заблокирован

// 3.Суб ПО заблокирован, если не выбран наимен ПО

// 4.Дата проверки: ограничить время выбора даты при
// открытии инспекции только сегодняшнюю, и 4 дня до;
export const secondCaseAOfIncludedFunctionTitles = [
  "Энергетика",
  "Транспортные Компании",
  "Автоматизация, метрология и связь",
  "Автоматизация и метрология",
];
export const secondCaseBOfIncludedFunctionTitles = [
  "Газ",
  "Добыча, инфраструктура и операционная деятельность",
];
export const secondCaseCOfIncludedFunctionTitles = [
  "Транспортные Компании",
  "Автоматизация, метрология и связь",
  "Автоматизация и метрология",
  "Энергетика",
];

export const secondCaseDOfIncludedFunctionTitles = [
  "Энергетика",
  "Транспортные Компании",
  "Автоматизация, метрология и связь",
  "Автоматизация и метрология",
  "Газ",
  "Добыча, инфраструктура и операционная деятельность",
];

export const firstCaseValues = [
  InspectionFormTypes.Contractor,
  InspectionFormTypes.Supervisor,
  InspectionFormTypes.ContractorStruct,
];
export const secondCaseAValues = [InspectionFormTypes.Contractor];
export const secondCaseBValues = [InspectionFormTypes.ContractorStruct];
export const secondCaseCValues = [InspectionFormTypes.Contractor];
export const secondCaseDValues = [InspectionFormTypes.Supervisor];

export const defaultDisabledFields = [
  InspectionFormTypes.Supervisor,
  InspectionFormTypes.ContractorStruct,
  InspectionFormTypes.SubContractor,
];

export const WILL_RESOLVE_BY_FILTER_VALUES = {
  willResolveBy: [
    {
      title: "УИД",
      id: "1",
    },
    {
      title: "Самопроверка",
      id: "2",
    },
  ],
};

export const DASHBOARD_URL =
  "https://qv/QvAJAXZfc/opendoc.htm?document=%D0%BA%D0%B0%D1%80%D0%BA%D0%B0%D1%81%20%D0%B1%D0%B5%D0%B7%D0%BE%D0%BF%D0%B0%D1%81%D0%BD%D0%BE%D1%81%D1%82%D0%B8%5C%D0%BA%D0%B0%D1%80%D0%BA%D0%B0%D1%81%20%D0%B1%D0%B5%D0%B7%D0%BE%D0%BF%D0%B0%D1%81%D0%BD%D0%BE%D1%81%D1%82%D0%B8.qvw&lang=ru-RU&host=QVS%40GPN-PROD";
