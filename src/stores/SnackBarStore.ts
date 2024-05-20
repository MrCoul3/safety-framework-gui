import { AppStore } from "./AppStore";
import { makeAutoObservable } from "mobx";
export type Item = {
  key: string
  message: string;
  status?: "alert" | "success";
};
export class SnackBarStore {
  private store: AppStore;

  snackBarItem: Item | null = null;

  setSnackBarItem(value: Item) {
    this.snackBarItem = value
  }
  clearSnackBar() {
    this.snackBarItem = null
  }

  constructor(store: AppStore) {
    this.store = store;
    makeAutoObservable(this);
  }
}
