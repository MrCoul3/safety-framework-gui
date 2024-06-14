export type Item = {
    title: string;
    id?: string;
    personFio?: string;
    code?:string
    ruleNumber?:string
};
export interface IFieldsData {
    [key: string]: Item[] | number;
}
export interface IFormFieldValue {
    [key: string]: Item | null;
}
export interface IFormFieldTextValue {
    [key: string]: string | null;
}
export interface IFormDateFieldValue {
    [key: string]: Date | null;
}
export interface IFilterDateRangeFieldValue {
    [key: string]: [Date?, Date?] | null;
}
export interface IFilterFieldValue {
    [key: string]: Item[] | null;
}
