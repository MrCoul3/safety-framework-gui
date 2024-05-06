import { AppStore } from "./AppStore";
import {makeAutoObservable, toJS} from "mobx";
import { InspectionFormTypes } from "../enums/InspectionFormTypes";
import { instance } from "../api/endpoints";

export interface IFieldsData {
    [key: string]: Item[]
}
export type Item = {
    Title: string;
    id: string | number;
};
export class InspectionStore {
  private store: AppStore;

  fieldsData: IFieldsData[] = [];

  setFieldsData(value: IFieldsData) {
      this.fieldsData = [...this.fieldsData, value];
  }

  async getFieldData(type: InspectionFormTypes) {
    try {
      const response = await instance.get(type);
      if (!response.data.error) {
          this.setFieldsData({[type]: response.data})
      }
    } catch (e) {}
  }
  constructor(store: AppStore) {
    this.store = store;
    makeAutoObservable(this);
  }
}
