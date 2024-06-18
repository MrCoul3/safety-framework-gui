import {
  EMPLOYEES,
  INSPECTION_FORM_COMMON_FIELDS,
  InspectionFormTypes,
} from "../enums/InspectionFormTypes";
import { toJS } from "mobx";
import { transformDateToServerFormat } from "../utils/transformDateToServerFormat";
import { Item } from "../interfaces/IFieldInterfaces";
import moment from "moment";
import { SortByProps } from "@consta/uikit/Table";
import {
  FREE_FORM_COMMON_FIELDS,
  FreeFormFieldTypes,
} from "../enums/FreeFormTypes";
import { IViolation } from "../interfaces/IViolation";
import {IInspection} from "../interfaces/IInspection";

const excludedFields = [InspectionFormTypes.AuditDate];

const excludedFreeFormFields = [FreeFormFieldTypes.ViolationManual];

const expandFreeFormValues = FREE_FORM_COMMON_FIELDS.filter(
  (val) => !excludedFreeFormFields.includes(val),
).join(",");

const expandFilledFreeForms = `filledFreeForms($expand=${expandFreeFormValues})`;

const expandFilledBarriers = `filledBarriers($expand=filledRequirements($expand=filledQuestions))`;

const expandFilterValues =
  INSPECTION_FORM_COMMON_FIELDS.filter(
    (val) => !excludedFields.includes(val),
  ).join(",") + `,${expandFilledFreeForms},${expandFilledBarriers}`;

export const expandFilter = `${expandFilterValues}`;

export const getTableFilters = (filterFieldsValues: {
  [key: string]: Item[] | [Date?, Date?];
}) =>
  Object.keys(filterFieldsValues).length
    ? Object.keys(filterFieldsValues)
        .map((key) => {
          console.log("getInspections key", key);
          if (key === InspectionFormTypes.AuditDate) {
            const values = filterFieldsValues[key] as [Date?, Date?];
            console.log("getInspections value", toJS(values));
            if (values && values.length) {
              if ((!values[1] && values[0]) || (values[1] && !values[0])) {
                const value = values.filter((val) => val)[0];
                const endDay = moment(value).endOf("day").toDate();
                return value
                  ? `${InspectionFormTypes.AuditDate} ge ${transformDateToServerFormat(value)} and ${InspectionFormTypes.AuditDate} le ${transformDateToServerFormat(endDay)}`
                  : "";
              }
              return values
                .map((value, index) => {
                  const val = !index
                    ? value
                    : moment(value).endOf("day").toDate();
                  if (val)
                    return value
                      ? `${InspectionFormTypes.AuditDate} ${!index ? "ge" : "le"} ${transformDateToServerFormat(val)}`
                      : "";
                })
                .join(" and ");
            }
          } else {
            const values = filterFieldsValues[key] as Item[];
            if (values && values.length) {
              return values
                .map((val) => `contains(${key}/title, '${val.title}')`)
                .join(" or ");
            }
          }
        })
        .join(" and ")
    : null;

export const getSortFilter = (sortSettings: SortByProps<any> | null) => {
  if (sortSettings?.sortingBy === InspectionFormTypes.AuditDate) {
    return `${sortSettings?.sortingBy} ${sortSettings?.sortOrder}`;
  }
  if (EMPLOYEES.includes(sortSettings?.sortingBy as InspectionFormTypes)) {
    return `${sortSettings?.sortingBy as string}/personFio ${sortSettings?.sortOrder}`;
  }
  if (sortSettings?.sortingBy && sortSettings?.sortOrder) {
    return `${sortSettings?.sortingBy as string}/title ${sortSettings?.sortOrder}`;
  }
};

export const getViolationFilters = (formFieldsValues: IInspection) => {
  console.log('formFieldsValues', toJS(formFieldsValues))
  const dateFrom = formFieldsValues?.date?.[0]
    ? moment(formFieldsValues?.date?.[0]).format("YYYY-MM-DD")
    : undefined;
  const dateTo = formFieldsValues?.date?.[1]
    ? moment(formFieldsValues?.date?.[1]).format("YYYY-MM-DD")
    : undefined;

  const result: any = {
    dateFrom: dateFrom,
    dateTo: dateTo,
    passport: formFieldsValues?.passport?.code,
    contractor: formFieldsValues?.contractor?.title,
    oilfield: formFieldsValues?.oilfield?.title,
    doStruct: formFieldsValues?.doStruct?.title,
    doObject: formFieldsValues?.doObject?.title,
    isResolved: !!formFieldsValues.isResolved,
  };
  if (formFieldsValues.isResolved === false) {
    delete result.isResolved
  }
  return result
};
