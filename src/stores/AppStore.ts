import {MainPageStore} from "./MainPageStore";

export class AppStore {

  mainPageStore: MainPageStore;
  constructor() {
    this.mainPageStore = new MainPageStore(this)
    console.debug(this);
  }

}
