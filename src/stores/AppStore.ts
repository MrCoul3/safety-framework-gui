import { MainPageStore } from "./MainPageStore";
import { makeAutoObservable } from "mobx";
import { InspectionStore } from "./InspectionStore";

export class AppStore {
  mainPageStore: MainPageStore;
  inspectionStore: InspectionStore;

  constructor() {
    this.mainPageStore = new MainPageStore(this);
    this.inspectionStore = new InspectionStore(this);
    makeAutoObservable(this);

    console.debug(this);
  }
}
