import { makeAutoObservable } from "mobx";
import { AppStore } from "./AppStore";
import { instance } from "../api/endpoints";
import { IInspection } from "../interfaces/IInspection";

export class MainPageStore {
  private store: AppStore;

  constructor(store: AppStore) {
    this.store = store;
    makeAutoObservable(this);
  }

  inspections: IInspection[] = [];

  setInspections(value: IInspection[]) {
    this.inspections = value;
  }

  async getInspectionsDev() {
    try {
      const response = await instance.get("inspections");
      if (!response.data.error) {
        console.log(response.data);
        this.setInspections(response.data)
      }
    } catch (e) {}
  }
}
