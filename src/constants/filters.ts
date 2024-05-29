import { InspectionFormTypes } from "../enums/InspectionFormTypes";
import { toJS } from "mobx";
import { transformDateToServerFormat } from "../utils/transformDateToServerFormat";
import { Item } from "../interfaces/IFieldInterfaces";

const excludedFields = [InspectionFormTypes.AuditDate];

const expandFilterValues = Object.values(InspectionFormTypes)
  .filter((val) => !excludedFields.includes(val))
  .join(",");

export const expandFilter = `${expandFilterValues}`;

export const tableFilters = (filterFieldsValues: {
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
                if (value)
                  return `createdWhen eq ${transformDateToServerFormat(value)}`;
              }
              return values
                .map((value, index) =>
                  value
                    ? `createdWhen ${!index ? "ge" : "le"} ${transformDateToServerFormat(value)}`
                    : "",
                )
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
