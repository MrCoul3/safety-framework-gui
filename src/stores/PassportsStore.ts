import { AppStore } from "./AppStore";
import { makeAutoObservable, toJS } from "mobx";
import { instance, localDevInstance } from "../api/endpoints";
import { IPassport } from "../interfaces/IPassport";
import {BarrierFieldTypes} from "../enums/BarrierTypes";

export class PassportsStore {
  private store: AppStore;

  constructor(store: AppStore) {
    this.store = store;
    makeAutoObservable(this);
  }
  passports: IPassport[] = [];
  setPassports(value: IPassport[]) {
    this.passports = value;
    console.debug("passports: ", toJS(this.passports));
  }

  async getPassportsDev() {
    this.store.loaderStore.setLoader("wait");
    try {
      setTimeout(async () => {
        const response = await localDevInstance.get("passports");
        if (!response.data.error) {
          this.setPassports(response.data);
        }
        this.store.loaderStore.setLoader("ready");
      }, 0)
    } catch (e) {
      this.store.loaderStore.setLoader("ready");

      console.error(e);
    }
  }

  async getPassports() {
    this.store.loaderStore.setLoader("wait");
    try {
      const response = await instance.get(
        "passports?$filter=IsActual eq true&$expand=barriers&$expand=icon&$count=true",
      );
      if (!response.data.error) {
        if (response.data.value) {
          this.setPassports(response.data.value);
        }
      }
      this.store.loaderStore.setLoader("ready");
    } catch (e) {
      this.store.loaderStore.setLoader("ready");
      console.error(e);
    }
  }
}
