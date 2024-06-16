import { AppStore } from "./AppStore";
import { makeAutoObservable, toJS } from "mobx";
import { IPassport } from "../interfaces/IPassport";
import {
  instance,
  localDevInstance,
  violationsInstance,
} from "../api/endpoints";
import { IViolation } from "../interfaces/IViolation";
import { getViolationFilters } from "../constants/filters";
import {IInspection} from "../interfaces/IInspection";

export class EliminationOfViolationsStore {
  private store: AppStore;

  constructor(store: AppStore) {
    this.store = store;
    makeAutoObservable(this);
  }
  passports: IPassport[] = [];
  violations: IViolation[] = [];
  setPassports(value: IPassport[]) {
    this.passports = value;
    console.debug("passports: ", toJS(this.passports));
  }
  clearViolations() {
    this.violations = []
  }
  setViolations(value: IViolation[]) {
    this.violations = value;
    console.debug("violations: ", toJS(this.violations));
  }

  async getPassportsDev() {
    try {
      const response = await instance.get("passports");
      if (!response.data.error) {
        const value = { passport: response.data };
        this.store.inspectionStore.setFieldsData(value);
      }
    } catch (e) {
      console.error(e);
    }
  }
  async getViolationsDev() {
    this.store.loaderStore.setLoader('wait')

    console.log(
        "getViolations",
        toJS(this.store.inspectionStore.formFieldsValues),
    );
    try {
      setTimeout(async () => {
        const response = await violationsInstance.get("violations");
        if (!response.data.error) {
          const value = response.data;
          this.setViolations(value);
        }
        this.store.loaderStore.setLoader('ready')
      }, 100)

    } catch (e) {
      this.store.loaderStore.setLoader('ready')
      console.error(e);
    }
  }
  async getViolations() {
    const formFieldsValues = this.store.inspectionStore
      .formFieldsValues as IInspection;
    console.log(
      "getViolations",
      toJS(this.store.inspectionStore.formFieldsValues),
    );
    this.store.loaderStore.setLoader('wait')
    try {
      const response = await violationsInstance.get("violations", {
        params: getViolationFilters(formFieldsValues),
      });
      if (!response.data.error) {
        const value = response.data;
        this.setViolations(value);
      }
      this.store.loaderStore.setLoader('ready')
    } catch (e) {
      this.store.loaderStore.setLoader('ready')
      console.error(e);
    }
  }
  async getPassports() {
    this.store.loaderStore.setLoader("wait");
    try {
      const response = await instance.get(
        "passports?$filter=IsActual eq true&$expand=barriers&$count=true",
      );
      if (!response.data.error) {
        if (response.data.value) {
          const value = { passport: response.data };
          this.store.inspectionStore.setFieldsData(value);
        }
      }
      this.store.loaderStore.setLoader("ready");
    } catch (e) {
      this.store.loaderStore.setLoader("ready");
      console.error(e);
    }
  }
}
