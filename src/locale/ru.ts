import { SubGroupsActionsTypes, SubGroupsTypes } from "../enums/SubGroupsTypes";
import { InspectionStatusesTypes } from "../enums/InspectionStatusesTypes";
import { CheckEntityTypes } from "../enums/CheckEntityTypes";
import {
  InspectionFormGroups,
  InspectionFormTypes,
} from "../enums/InspectionFormTypes";

export const ru = {
  dict: {
    of: "из",
    from: "с",
    to: "по",
    reset: "Сбросить",
    cancel: "Отмена",
    next: "Продолжить",
    farther: "Дальше",
    edit: "Редактировать",
    recover: "Восстановить",
    delete: "Удалить",
    send: "Отправить",
    apply: "Применить",
    select: "Выбрать",
    close: "Закрыть",
    download: "Скачать",
    filters: "Фильтры",
    selected: "Выбрано: ",
    selectAll: "Выбрать все",
    unselectAll: "Снять выделение",
    clearAll: "Очистить все",
    description: "Описание",

    createInspection: "Создать инспекцию",

    toHome: "На главную",

    [SubGroupsTypes.Statistic]: "Статистика",
    [SubGroupsActionsTypes.MainList]: "Общий список",
    [SubGroupsTypes.Inspections]: "Инспекции",
    [SubGroupsActionsTypes.NewInspections]: "Новые инспекции",
    [SubGroupsActionsTypes.Sent]: "Отправленные",
    [SubGroupsActionsTypes.Deleted]: "Удаленные",
    [SubGroupsTypes.Information]: "Информация",
    [SubGroupsActionsTypes.BarriersCarts]: "Корзины барьеров",
    [SubGroupsActionsTypes.BarriersApps]: "Приложения к барьерам",

    [InspectionStatusesTypes.Success]: "Успешно отправлено",
    [InspectionStatusesTypes.Error]: "Ошибка отправки",
    [InspectionStatusesTypes.Warning]: "Инспекция не заполнена",

    [CheckEntityTypes.Barriers]: "Барьеры",
    [CheckEntityTypes.FreeForms]: "Свободные формы",

    searchPlaceholder: "Я ищу",
    mainTitle: "Каркас безопасности",
    addInspection: "Добавить инспекцию",
    inspection: "Инспекция",
    noOptions: "Не найдено",
    fastSearch: "Быстрый поиск",
    checkVerifyDate: "Дата выполнения проверки",
    checkEditedDate: "Дата редактирования проверки",
    checkDetails: "Детали проверки",
    inspectionNumber: "Номер инспекции",

    // Данные формы
    [InspectionFormGroups.Common]: "Общее",
    [InspectionFormTypes.AuditDate]: "Дата проверки",
    [InspectionFormTypes.InspectionForm]: "Форма проверки",
    [InspectionFormTypes.InspectionType]: "Тип проверки",
    [InspectionFormTypes.Function]: "Функция",
    [InspectionFormGroups.InspectionPlace]: "Место проведения проверки",
    [InspectionFormTypes.OilField]: "Месторождение",
    [InspectionFormTypes.DoStructs]: "Структурное подразделение ДО",
    [InspectionFormTypes.DoObjects]: "Объект ДО, где проводилась проверка",
    [InspectionFormGroups.ContractorUnderReview]:
      "Проверяемая подрядная организация",
    [InspectionFormTypes.Contractors]: "Наименование ПО",
    [InspectionFormTypes.TeamNumber]: "Номер бригады ПО",
    [InspectionFormTypes.SubContractors]:
      "Наименование субподрядной организации",
    [InspectionFormGroups.InspectionParticipants]: "Участники инспекции",

    addInspectionTitle: "Подготовка данных инспекции",
    addInspectionDescription:
      "Заполните все ключевые поля, чтобы перейти дальше по структуре заполнения",

    [InspectionFormTypes.InspectionForm + "Placeholder"]:
      "Введите форму проверки",
    [InspectionFormTypes.InspectionType + "Placeholder"]:
      "Введите тип проверки",
    [InspectionFormTypes.Function + "Placeholder"]: "Введите функция",
    [InspectionFormTypes.OilField + "Placeholder"]: "Введите месторождение",
    [InspectionFormTypes.DoStructs + "Placeholder"]:
      "Введите структурное подразделение ДО",
    [InspectionFormTypes.DoObjects + "Placeholder"]:
      "Введите объект ДО, где проводилась проверка",
    [InspectionFormTypes.Contractors + "Placeholder"]:
      "Введите наименование ПО",
    [InspectionFormTypes.TeamNumber + "Placeholder"]:
      "Введите номер бригады ПО",
    [InspectionFormTypes.SubContractors + "Placeholder"]:
      "Введите наименование субподрядной организации",
  },
};
