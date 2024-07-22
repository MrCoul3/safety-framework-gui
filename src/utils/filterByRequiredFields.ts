import {
  InspectionFormTypes,
} from "../enums/InspectionFormTypes";

export function filterByRequiredFields(formFieldsValues: {
  [key: string]: any;
}, requiredFields: string[]) {
  return Object.keys(formFieldsValues)
    .map((key) => {
      if (
          requiredFields.includes(key as InspectionFormTypes)
      ) {
        return { [key]: formFieldsValues[key] };
      }
    })
    .filter((val) => val);
}
