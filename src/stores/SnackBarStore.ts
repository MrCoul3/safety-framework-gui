import { AppStore } from "./AppStore";
import { makeAutoObservable } from "mobx";
import { IconComponent } from "@consta/icons/Icon";

export type Item = {
  key: string;
  message: string;
  status?: "alert" | "success";
  icon?: IconComponent;
};
export class SnackBarStore {
  private store: AppStore;

  snackBarItem: Item | null = null;

  alertSnackBar(label: string) {
    this.setSnackBarItem({
      message: label,
      key: "1",
      status: "alert",
    });
  }
  successSnackBar(label: string) {
    this.setSnackBarItem({
      message: label,
      key: "1",
      status: "success",
    });
  }

  setSnackBarItem(value: Item) {
    this.snackBarItem = value;
  }
  clearSnackBar() {
    this.snackBarItem = null;
  }

  constructor(store: AppStore) {
    this.store = store;
    makeAutoObservable(this);
  }
}
