import {AppStore} from "./AppStore";
import {makeAutoObservable, toJS} from "mobx";
import {IPassport} from "../interfaces/IPassport";
import {instance, localDevInstance} from "../api/endpoints";

export class EliminationOfViolationsStore {
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
            const response = await instance.get("passports");
            if (!response.data.error) {
                const value = {"passport": response.data}
                this.store.inspectionStore.setFieldsData(value);
            }
        } catch (e) {
            console.error(e);
        }
    }
}