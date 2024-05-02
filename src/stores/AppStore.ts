import { MainPageStore } from "./MainPageStore";
import {makeAutoObservable} from "mobx";

export class AppStore {
  mainPageStore: MainPageStore;

  test: string = 'string';
  constructor() {
    this.mainPageStore = new MainPageStore(this);
    makeAutoObservable(this);

    console.debug(this);
  }
}
