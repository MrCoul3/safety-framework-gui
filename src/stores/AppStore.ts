import { MainPageStore } from "./MainPageStore";
import { makeAutoObservable } from "mobx";
import { InspectionStore } from "./InspectionStore";
import {SnackBarStore} from "./SnackBarStore";
import {PassportsStore} from "./PassportsStore";
import {BarriersStore} from "./BarriersStore";
import {LoaderStore} from "./LoaderStore";

export class AppStore {
  mainPageStore: MainPageStore;
  inspectionStore: InspectionStore;
  snackBarStore: SnackBarStore;
  passportsStore: PassportsStore;
  barriersStore: BarriersStore;
  loaderStore: LoaderStore;


  constructor() {
    this.mainPageStore = new MainPageStore(this);
    this.inspectionStore = new InspectionStore(this);
    this.snackBarStore = new SnackBarStore(this);
    this.passportsStore = new PassportsStore(this);
    this.barriersStore = new BarriersStore(this);
    this.loaderStore = new LoaderStore(this);
    makeAutoObservable(this);

    console.debug(this);
  }
}
