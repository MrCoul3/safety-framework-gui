import { IFieldsData, Item } from "../interfaces/IFieldInterfaces";

export function joinObjectValues(a: IFieldsData, b: IFieldsData) {
  const valsB = Object.values(b)[0] as Item[];
  const valsA = Object.values(a)[0] as Item[];
  const key = Object.keys(a)[0];
  const newObj = { [key]: [...valsA, ...valsB] };
  return newObj;
}
