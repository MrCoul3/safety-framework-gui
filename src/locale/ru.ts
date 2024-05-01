import {SubGroupsActionsTypes, SubGroupsTypes} from "../enums/SubGroupsTypes";
import {InspectionStatusesTypes} from "../enums/InspectionStatusesTypes";
import {CheckEntityTypes} from "../enums/CheckEntityTypes";

export const ru = {
    dict: {
        of: "из",
        from: "с",
        to: "по",
        reset: "Сбросить",
        cancel: "Отмена",
        next: "Продолжить",
        delete: "Удалить",
        apply: "Применить",
        select: "Выбрать",
        close: "Закрыть",
        download: "Скачать",
        filters: "Фильтры",
        selected: "Выбрано: ",
        selectAll: "Выбрать все",
        unselectAll: "Снять выделение",

        [SubGroupsTypes.Statistic]: "Статистика",
        [SubGroupsActionsTypes.MainList]: "Общий список",
        [SubGroupsTypes.Inspections]: "Инспекции",
        [SubGroupsActionsTypes.Completed]: "Заполненные",
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
        noOptions: "Не найдено",
        fastSearch: "Быстрый поиск",
        checkVerifyDate: "Дата выполнения проверки",
        checkEditedDate: "Дата редактирования проверки",
        checkDetails: "Детали проверки",
        doObject: "Структурное подразделение ДО",
    },
};
