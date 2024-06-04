import { AppStore } from "./AppStore";
import {makeAutoObservable, toJS} from "mobx";
import { instance, localDevInstance } from "../api/endpoints";
import { IPassport } from "../interfaces/IPassport";

export class PassportsStore {
  private store: AppStore;

  constructor(store: AppStore) {
    this.store = store;
    makeAutoObservable(this);
  }
  passports: IPassport[] = [];
  setPassports(value: IPassport[]) {
    this.passports = value;
    console.debug('passports: ', toJS(this.passports))
  }

  async getPassportsDev() {
    try {
      const response = await localDevInstance.get("passports");
      if (!response.data.error) {
        this.setPassports(response.data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getPassports() {
    try {
      const response = await instance.get(
        "Passports?$filter=IsActual eq true&$count=true",
      );
      if (!response.data.error) {
        if (response.data.value) {
          this.setPassports(response.data.value);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}
