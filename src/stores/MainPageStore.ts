import { makeAutoObservable } from "mobx";
import { AppStore } from "./AppStore";
import { instance } from "../api/endpoints";
import { IInspection } from "../interfaces/IInspection";
import { SubGroupsActionsTypes, SubGroupsTypes } from "../enums/SubGroupsTypes";
import { IconBento } from "@consta/icons/IconBento";
import { IconList } from "@consta/icons/IconList";
import { IconMail } from "@consta/icons/IconMail";
import { IconDocFilled } from "@consta/icons/IconDocFilled";
import { IconStorage } from "@consta/icons/IconStorage";
import { ISubGroupState } from "../interfaces/ISubGroupState";
export class MainPageStore {
  private store: AppStore;

  constructor(store: AppStore) {
    this.store = store;
    makeAutoObservable(this);
  }

  inspections: IInspection[] = [];
  localInspections: IInspection[] = [];
  sideBarItemValue: SubGroupsActionsTypes | null =
    SubGroupsActionsTypes.MainList;

  subGroupsState: ISubGroupState[] = [
    {
      name: SubGroupsTypes.Statistic,
      actions: [
        {
          label: SubGroupsActionsTypes.MainList,
          icon: IconBento,
          active: true,
        },
      ],
    },
    {
      name: SubGroupsTypes.Inspections,
      actions: [
        {
          label: SubGroupsActionsTypes.Sent,
          icon: IconMail,
        },
        {
          label: SubGroupsActionsTypes.NewInspections,
          icon: IconList,
        },
      ],
    },
    {
      name: SubGroupsTypes.Information,
      actions: [
        {
          label: SubGroupsActionsTypes.BarriersCarts,
          icon: IconStorage,
        },

        {
          label: SubGroupsActionsTypes.BarriersApps,
          icon: IconDocFilled,
        },
      ],
    },
  ];
  resetSideBarToHome() {
    this.updateSubGroupsState(SubGroupsActionsTypes.MainList);
  }
  updateSubGroupsState(value: SubGroupsActionsTypes) {
    this.subGroupsState = this.subGroupsState.map((item) => {
      const foundAction = item.actions.find((action) => action.label === value);
      const foundActive = item.actions.find((action) => action.active);
      if (foundAction && foundAction.active) {
        return item;
      }
      if (foundAction) foundAction.active = true;
      if (foundActive) foundActive.active = false;
      return item;
    });
  }

  setInspections(value: IInspection[]) {
    this.inspections = value;
  }
  setLocalInspections(value: IInspection[]) {
    this.localInspections = value;
  }
  setSideBarItemValue(value: SubGroupsActionsTypes) {
    this.sideBarItemValue = value;
  }

  async getInspectionsDev() {
    try {
      const response = await instance.get("inspections");
      if (!response.data.error) {
        this.setInspections(response.data);
      }
    } catch (e) {}
  }
}
