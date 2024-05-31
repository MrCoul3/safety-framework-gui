import { AppStore } from "./AppStore";
import { makeAutoObservable, toJS } from "mobx";
import { LOCAL_STORE_INSPECTIONS } from "../constants/config";
import { IFreeForm } from "../interfaces/IFreeForm";
import { FreeFormTypes } from "../enums/FreeFormTypes";
import { IEntity } from "../interfaces/IEntity";
import { IInspection } from "../interfaces/IInspection";

export class FreeFormStore {
  private store: AppStore;

  constructor(store: AppStore) {
    this.store = store;
    makeAutoObservable(this);
  }

  freeForms: (IFreeForm | {})[] = [];
  setFreeForm(value: IFreeForm[]) {
    this.freeForms = value;
  }
  addFreeForm() {
    this.freeForms = [...this.freeForms, this.getFreeFormTemplate()];
    console.log("this.freeForms", toJS(this.freeForms));
  }

  deleteFreeForm(index: number) {
    this.freeForms = this.freeForms.filter((item, i) => index !== i)
  }

  clearFreeForm() {
    this.freeForms = [];
  }

  getFreeFormTemplate() {
    const template = {};
    Object.values(FreeFormTypes).forEach((type) => {
      Object.assign(template, { [type]: null });
    });
    return template;
  }

  updateInspectionToLocalStorage(editInspectionId: string) {
    const index = +editInspectionId - 1;
    const localInspections = localStorage.getItem(LOCAL_STORE_INSPECTIONS);

    if (localInspections) {
      const localInspectionsParsed = JSON.parse(localInspections);
      if (localInspectionsParsed.length) {
        const targetInspection = localInspectionsParsed[index];
        targetInspection.freeForms = this.freeForms;
        localInspectionsParsed.splice(index, 1);
        localInspectionsParsed.push(targetInspection);
        const newInspectionsJson = JSON.stringify(localInspectionsParsed);
        localStorage.setItem(LOCAL_STORE_INSPECTIONS, newInspectionsJson);
      }
    }
  }
}
