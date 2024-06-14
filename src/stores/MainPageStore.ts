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
import {
  INSPECTIONS_ON_PAGE,
  LOCAL_STORE_INSPECTIONS,
} from "../constants/config";
import {
  expandFilter,
  getSortFilter,
  getTableFilters,
} from "../constants/filters";
import { IInspectionFilters } from "../interfaces/IInspectionFilters";
import { INSPECTION_FORM_REQUIRED_FIELDS } from "../enums/InspectionFormTypes";
import {
  IFilterDateRangeFieldValue,
  IFilterFieldValue,
  Item,
} from "../interfaces/IFieldInterfaces";
import { SortByProps } from "@consta/uikit/Table";
import { filterByRequiredFields } from "../utils/filterByRequiredFields";
import { IFreeForm } from "../interfaces/IFreeForm";
import { IFilledBarrier } from "../interfaces/IFilledBarrier";
import { BarrierFieldTypes } from "../enums/BarrierTypes";

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
    console.log('updateSubGroupsState', value)
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
  clearInspections() {
    this.inspections = [];
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

    const tableFilterValues = getTableFilters(filterFieldsValues);

    const tableFilter = tableFilterValues
      ? `&$filter=${tableFilterValues}`
      : "";

    const sortFilterValues = getSortFilter(this.sortSettings);

    const sortFilter = sortFilterValues
      ? `&$orderby=${sortFilterValues}`
      : `&$orderby=createdWhen desc`;

    try {
      const response = await instance.get(
        `${inspectionsEndpoint}?$skip=${this.inspectionOffset}&$top=${INSPECTIONS_ON_PAGE}&$expand=${expandFilter}${tableFilter}${sortFilter}&$count=true`,
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
    this.getInspections();
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
  sortSettings: SortByProps<any> | null = null;
  setSortSetting(value: SortByProps<any> | null) {
    this.sortSettings = value;
    console.log("this.sortSetting", toJS(this.sortSettings));
  }

  getLocalInspection(index: number) {
    console.log("getLocalInspection", index);
    const localInspections = localStorage.getItem(LOCAL_STORE_INSPECTIONS);
    if (localInspections) {
      const localInspectionsParsed = JSON.parse(localInspections);

      console.log(
        "getLocalInspection localInspectionsParsed[index]",
        toJS(localInspectionsParsed[index]),
      );
      return localInspectionsParsed[index];
    }
  }

  checkIsInspectionReadyToSend(index: number, formTypeId?: number) {
    const inspection: IInspection = this.getLocalInspection(index);
    if (inspection) {
      console.log("checkIsInspectionReadyToSend inspection", toJS(inspection));
      const freeForms: IFreeForm[] = inspection["filledFreeForms"] ?? [];
      const filledBarriers: IFilledBarrier[] =
        inspection["filledBarriers"] ?? [];
      console.log("checkIsInspectionReadyToSend freeForms", toJS(freeForms));
      console.log("checkIsInspectionReadyToSend filledBarriers", toJS(filledBarriers));
      console.log("checkIsInspectionReadyToSend formType", toJS(formTypeId));

      if (filledBarriers.length) {
       return  filledBarriers.every(
          (bar) =>
            bar[BarrierFieldTypes.Mub] &&
            bar[BarrierFieldTypes.Mub]?.trim() !== "",
        ) && this.store.inspectionStore.checkIsFormSuccess(inspection)
      }

      if (freeForms.length) {
        const filteredCommonFields = filterByRequiredFields(
          inspection,
          INSPECTION_FORM_REQUIRED_FIELDS,
        );
        const filteredFreeFormsFields = freeForms.map((freeForm) => {
          const requireFields =
            this.store.freeFormStore.getFreeFormRequireFields(freeForm);
          return filterByRequiredFields(freeForm, requireFields);
        });
        const freeFormsResult = filteredFreeFormsFields.map((freeForm) => {
          if (freeForm) {
            const requireFields =
              this.store.freeFormStore.getFreeFormRequireFields(
                freeForm as unknown as IFreeForm,
              );

            return Object.values(freeForm).every(
              (value) =>
                Object.values(value ?? {})[0] &&
                Object.values(freeForm).length === requireFields.length,
            );
          }
        }); // [bool, bool]

        const commonFieldsResult =
          filteredCommonFields.every((value) => {
            return Object.values(value ?? {})[0];
          }) &&
          filteredCommonFields.length ===
            INSPECTION_FORM_REQUIRED_FIELDS.length;

        const result = [...freeFormsResult, commonFieldsResult].every(
          (val) => val,
        );
        console.log("checkIsInspectionReadyToSend result", index, toJS(result));
        return result && this.store.inspectionStore.checkIsFormSuccess(inspection);
      }
    }
  }

  async sendInspection(index: number) {
    try {
      const response = await instance.post(`Inspections`, {
        ...this.getLocalInspection(index),
      });
      if (!response.data.error) {
        return "success";
      }
    } catch (e) {
      console.error(e);
    }
  }

  login: { login: string; title: string } | null = null;
  responseStatus: number | null = null;
  setLogin(value: { login: string; title: string }) {
    this.login = value;
    console.debug("login: ", toJS(this.login));
  }
  setResponseStatus(value: number) {
    this.responseStatus = value;
    console.debug("responseStatus: ", toJS(this.responseStatus));
  }
  async getMemberInfo() {
    this.store.loaderStore.setLoader("wait");
    try {
      const response = await instance.get(`MemberInfo`);
      console.log("response!!", response);
      if (!response.data.error) {
        this.setLogin(response.data);
        this.store.loaderStore.setLoader("ready");
      }
    } catch (e: any) {
      console.error("error", e);
      this.setResponseStatus(e.response.status);
      this.store.loaderStore.setLoader("ready");
    }
  }
}
