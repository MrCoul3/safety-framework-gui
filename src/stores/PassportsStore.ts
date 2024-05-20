import {AppStore} from "./AppStore";
import {makeAutoObservable} from "mobx";
import { instance, localDevInstance} from "../api/endpoints";
import {IPassport} from "../interfaces/IPassport";

export class PassportsStore {
    private store: AppStore;

    constructor(store: AppStore) {
        this.store = store;
        makeAutoObservable(this);
    }
    passports: IPassport[] = [];
    setPassports(value: IPassport[]) {
        this.passports = value;
    }

    async getPassportsDev() {
        try {
            const response = await localDevInstance.get("passports");
            if (!response.data.error) {
                this.setPassports(response.data);
            }
        } catch (e) {}
    }

    async getPassports() {
        try {
            const response = await instance.get("Passports?$filter=IsActual%20eq%20true&$count=true");
            if (!response.data.error) {
                this.setPassports(response.data);
            }
        } catch (e) {}
    }

}