import {SubGroupsActionsTypes, SubGroupsTypes} from "../enums/SubGroupsTypes";

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

        searchPlaceholder: "Я ищу",
        mainTitle: "Каркас безопасности",
    },
};
