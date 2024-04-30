import { makeAutoObservable } from "mobx";
import { AppStore } from "./AppStore";

export class MainPageStore {
  private store: AppStore;



  constructor(store: AppStore) {
    this.store = store;
    makeAutoObservable(this);
  }
}
