import { MainPageStore } from "./MainPageStore";
import { makeAutoObservable } from "mobx";
import { InspectionStore } from "./InspectionStore";
import {SnackBarStore} from "./SnackBarStore";

export class AppStore {
  mainPageStore: MainPageStore;
  inspectionStore: InspectionStore;
  snackBarStore: SnackBarStore;

  constructor() {
    this.mainPageStore = new MainPageStore(this);
    this.inspectionStore = new InspectionStore(this);
    this.snackBarStore = new SnackBarStore(this);
    makeAutoObservable(this);

    console.debug(this);
  }
}
