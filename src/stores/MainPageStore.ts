import { makeAutoObservable, toJS } from "mobx";
import { AppStore } from "./AppStore";
import { inspectionsEndpoint, instance } from "../api/endpoints";
import { IInspection } from "../interfaces/IInspection";
import { SubGroupsActionsTypes, SubGroupsTypes } from "../enums/SubGroupsTypes";
import { IconBento } from "@consta/icons/IconBento";
import { IconList } from "@consta/icons/IconList";
import { IconMail } from "@consta/icons/IconMail";
import { IconDocFilled } from "@consta/icons/IconDocFilled";
import { IconStorage } from "@consta/icons/IconStorage";
import { IconHelmet } from "@consta/icons/IconHelmet";
import { ISubGroupState } from "../interfaces/ISubGroupState";
import { INSPECTIONS_ON_PAGE } from "../constants/config";
import {expandFilter, tableFilters} from "../constants/filters";
import { IInspectionFilters } from "../interfaces/IInspectionFilters";
import { InspectionFormTypes } from "../enums/InspectionFormTypes";
import { transformDateToServerFormat } from "../utils/transformDateToServerFormat";
import {
  IFilterDateRangeFieldValue,
  IFilterFieldValue,
  IFormDateFieldValue,
  Item,
} from "../interfaces/IFieldInterfaces";

export interface IDeletingInspectionType {
  type: SubGroupsActionsTypes;
  id: string;
}

export class MainPageStore {
  private store: AppStore;

  constructor(store: AppStore) {
    this.store = store;
    makeAutoObservable(this);
  }
  deletingInspectionType: IDeletingInspectionType | null = null;
  setDeletingInspectionType(val: IDeletingInspectionType) {
    this.deletingInspectionType = val;
  }
  inspections: IInspection[] = [];
  inspectionsCount: number | null = null;
  localInspections: IInspection[] = [];
  sideBarItemValue: SubGroupsActionsTypes | null =
    SubGroupsActionsTypes.MainList;

  subGroupsState: ISubGroupState[] = [
    /* {
      name: SubGroupsTypes.Statistic,
      actions: [
        {
          label: SubGroupsActionsTypes.MainList,
          icon: IconBento,
          active: true,
        },
      ],
    },*/
    {
      name: SubGroupsTypes.Inspections,
      actions: [
        {
          label: SubGroupsActionsTypes.MainList,
          icon: IconBento,
          active: true,
        },
        {
          label: SubGroupsActionsTypes.Sent,
          icon: IconMail,
        },
        {
          label: SubGroupsActionsTypes.NewInspections,
          icon: IconList,
        },
        {
          label: SubGroupsActionsTypes.EliminationOfViolations,
          icon: IconHelmet,
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
    console.log("this.inspections", toJS(this.inspections));
  }
  updateInspections(value: IInspection[]) {
    this.inspections = [...this.inspections, ...value];
    console.log("this.inspections", toJS(this.inspections));
  }
  setInspectionsCount(value: number) {
    this.inspectionsCount = value;
    console.log("this.inspectionsCount", this.inspectionsCount);
  }
  setLocalInspections(value: IInspection[]) {
    this.localInspections = value;
    console.log("this.localInspections", toJS(this.localInspections));
  }
  setSideBarItemValue(value: SubGroupsActionsTypes) {
    this.sideBarItemValue = value;
  }

  inspectionOffset: number = 0;
  setInspectionOffset(value: number) {
    this.inspectionOffset = value;
  }
  increaseInspectionOffset() {
    console.log("increaseInspectionOffset");
    this.inspectionOffset = this.inspectionOffset + INSPECTIONS_ON_PAGE;
  }
  clearInspectionOffset() {
    this.inspectionOffset = 0;
  }

  async getInspectionsDev() {
    this.store.loaderStore.setLoader("wait");
    try {
      const response = await instance.get(`${inspectionsEndpoint}`);
      if (!response.data.error) {
        setTimeout(() => {}, 0);

        this.setInspectionsCount(48546);
        this.setInspections(response.data);
        this.store.loaderStore.setLoader("ready");
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getInspections() {
    this.store.loaderStore.setLoader("wait");
    const filterFieldsValues = this.filterFieldsValues as {
      [key: string]: Item[] | [Date?, Date?];
    };

    const tableFilterValues = tableFilters(filterFieldsValues)

    const tableFilter = tableFilterValues
      ? `&$filter=${tableFilterValues}`
      : "";

    try {
      const response = await instance.get(
        `${inspectionsEndpoint}?$skip=${this.inspectionOffset}&$top=${INSPECTIONS_ON_PAGE}&$expand=${expandFilter}${tableFilter}&$count=true`,
      );
      if (!response.data.error) {
        this.setInspectionsCount(response.data["@odata.count"]);
        if (response.data.value) {
          this.setInspections(response.data.value);
        }
        this.store.loaderStore.setLoader("ready");
      }
    } catch (e) {
      console.error(e);
    }
  }
  async getInspectionsByScrollToBottomOnDashboard() {
    try {
      const response = await instance.get(
        `${inspectionsEndpoint}?$skip=${this.inspectionOffset}&$top=${INSPECTIONS_ON_PAGE}&$expand=${expandFilter}&$count=true`,
      );
      if (!response.data.error) {
        this.setInspectionsCount(response.data["@odata.count"]);
        if (response.data.value) {
          this.updateInspections(response.data.value);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  async deleteSentInspection(id?: string) {
    console.log("deleteSentInspection");
    try {
      const response = await instance.delete(`Inspections/${id}`);
      if (!response.data.error) {
      }
    } catch (e) {
      console.error(e);
    }
  }
  filterFieldsValues: IInspectionFilters | {} = {};

  resetFilters() {
    this.filterFieldsValues = {};
  }
  updateFormFieldsValues(
    value: IFilterFieldValue | IFilterDateRangeFieldValue,
  ) {
    Object.assign(this.filterFieldsValues, value);
    console.debug(
      "updateFormFieldsValues formFieldsValues: ",
      toJS(this.filterFieldsValues),
    );
  }
}
