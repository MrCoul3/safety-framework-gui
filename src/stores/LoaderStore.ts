import {AppStore} from "./AppStore";
import {makeAutoObservable} from "mobx";
import {LoaderType} from "../interfaces/LoaderType";

export class LoaderStore {
    private store: AppStore;

    constructor(store: AppStore) {
        this.store = store;
        makeAutoObservable(this);
    }

    loader: LoaderType = "wait";
    barriersLoader: LoaderType = "wait";

    setLoader(val: LoaderType) {
        this.loader = val;
        console.log('loader', this.loader)
    }
    setBarriersLoader(val: LoaderType) {
        this.barriersLoader = val;
        console.log('barriersLoader', this.barriersLoader)
    }
}