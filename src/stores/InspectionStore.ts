import { AppStore } from "./AppStore";
import { makeAutoObservable, toJS } from "mobx";
import { InspectionFormTypes } from "../enums/InspectionFormTypes";
import { instance } from "../api/endpoints";
import { LOCAL_STORE_INSPECTIONS } from "../constants/config";
import moment from "moment/moment";

export interface IFieldsData {
  [key: string]: Item[];
}
export type Item = {
  Title: string;
};

export interface IFormFieldValue {
  [key: string]: Item | null | string;
}
export interface IFormDateFieldValue {
  [key: string]: [Date?, Date?] | null;
}
export class InspectionStore {
  private store: AppStore;

  constructor(store: AppStore) {
    this.store = store;
    makeAutoObservable(this);
  }
  fieldsData: IFieldsData[] = [];
  isValidate: boolean = false;
  setIsValidate(value: boolean) {
    this.isValidate = value;
  }

  formFieldsValues: IFormFieldValue | IFormDateFieldValue = {};

  setFieldsData(value: IFieldsData) {
    this.fieldsData = [...this.fieldsData, value];
    console.log("this.fieldsData", toJS(this.fieldsData));
  }

  setFormFieldsValues(value: IFormFieldValue | IFormDateFieldValue) {
    Object.assign(this.formFieldsValues, value);
    console.debug("formFieldsValues: ", toJS(this.formFieldsValues));
  }

  async getFieldData(type: InspectionFormTypes) {
    try {
      const response = await instance.get(type);
      if (!response.data.error) {
        this.setFieldsData({ [type]: response.data });
      }
    } catch (e) {}
  }

  clearInspectionForm() {
    this.formFieldsValues = {};
  }

  checkIsFormSuccess() {
    return (
      Object.keys(InspectionFormTypes).length ===
        Object.keys(this.formFieldsValues).length &&
      !Object.values(this.formFieldsValues).some((field) => field === null)
    );
  }

  setInspectionToLocalStorage() {
    const localInspections = localStorage.getItem(LOCAL_STORE_INSPECTIONS);
    if (localInspections) {
      const localInspectionsParsed = JSON.parse(localInspections);
      if (localInspectionsParsed) {
        localInspectionsParsed.push(this.formFieldsValues);
      }
      const newInspectionsJson = JSON.stringify(localInspectionsParsed);
      localStorage.setItem(LOCAL_STORE_INSPECTIONS, newInspectionsJson);
    } else {
      const newInspectionJson = JSON.stringify([this.formFieldsValues]);
      localStorage.setItem(LOCAL_STORE_INSPECTIONS, newInspectionJson);
    }
  }
  updateInspectionToLocalStorage(editInspectionId: string) {
    const index = +editInspectionId - 1;
    const localInspections = localStorage.getItem(LOCAL_STORE_INSPECTIONS);
    if (localInspections) {
      const localInspectionsParsed = JSON.parse(localInspections);
      if (localInspectionsParsed.length) {
        localInspectionsParsed.splice(index, 1);
        localInspectionsParsed.push(this.formFieldsValues);
        const newInspectionsJson = JSON.stringify(localInspectionsParsed);
        localStorage.setItem(LOCAL_STORE_INSPECTIONS, newInspectionsJson);
      }
    }
  }

  deleteInspectionFromLocalStorage(editInspectionId: string) {
    const index = +editInspectionId - 1;
    const localInspections = localStorage.getItem(LOCAL_STORE_INSPECTIONS);
    if (localInspections) {
      const localInspectionsParsed = JSON.parse(localInspections);
      if (localInspectionsParsed.length) {
        localInspectionsParsed.splice(index, 1);
        const newInspectionsJson = JSON.stringify(localInspectionsParsed);
        localStorage.setItem(LOCAL_STORE_INSPECTIONS, newInspectionsJson);
      }
    }
  }

  loadInspectionFromLocalStorage(id: string) {
    const localInspections = localStorage.getItem(LOCAL_STORE_INSPECTIONS);
    if (localInspections) {
      const localInspectionsParsed = JSON.parse(localInspections);
      const inspection = {
        ...localInspectionsParsed[+id - 1],
        auditDate: moment(localInspectionsParsed[+id - 1].auditDate).toDate(),
      };
      this.setFormFieldsValues(inspection);
    }
  }

  handleOpenField(type: InspectionFormTypes) {
    const foundField = !!this.fieldsData.find((data) =>
      Object.keys(data).includes(type),
    );
    if (!foundField) {
      this.getFieldData(type);
    }
  }
}
