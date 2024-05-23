import {AppStore} from "./AppStore";
import {makeAutoObservable} from "mobx";
import { instance, localDevInstance} from "../api/endpoints";
import {IBarrier} from "../interfaces/IBarrier";

export class BarriersStore {
    private store: AppStore;

    constructor(store: AppStore) {
        this.store = store;
        makeAutoObservable(this);
    }
    barriers: IBarrier[] = [];
    setBarriers(value: IBarrier[]) {
        this.barriers = value;

    }

    async getBarriersDev(passportId: string) {
        try {
            const response = await localDevInstance.get(`barriers?PassportId=${passportId}`);
            if (!response.data.error) {
                this.setBarriers(response.data);
            }
        } catch (e) {}
    }
    async getBarriers(passportId: string) {
        try {
            const response = await instance.get(`Barriers?$filter=(PassportId eq ${passportId})and(IsActual eq true)and(IsPk ne null)&$count=true`);
            if (!response.data.error) {
                this.setBarriers(response.data.value);
            }
        } catch (e) {}
    }


}