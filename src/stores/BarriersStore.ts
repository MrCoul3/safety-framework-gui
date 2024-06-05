import { AppStore } from "./AppStore";
import { makeAutoObservable, toJS } from "mobx";
import { instance, localDevInstance } from "../api/endpoints";
import { IBarrier } from "../interfaces/IBarrier";

export class BarriersStore {
  private store: AppStore;

  constructor(store: AppStore) {
    this.store = store;
    makeAutoObservable(this);
  }
  barriers: IBarrier[] = [];
  setBarriers(value: IBarrier[]) {
    this.barriers = value;
    console.debug("barriers: ", toJS(this.barriers));
  }

  async getBarriersDev() {
    try {
      const response = await localDevInstance.get(
        `barriers`,
      );
      if (!response.data.error) {
        this.setBarriers(response.data);
      }
    } catch (e) {
      console.error(e);
    }
  }
  async getBarriers(passportId: string) {
    try {
      const response = await instance.get(
        `Barriers?$filter=(passportId eq ${passportId})and(IsActual eq true)and(IsPk ne null)&$count=true`,
      );
      if (!response.data.error) {
        if (response.data.value) {
          this.setBarriers(response.data.value);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}
