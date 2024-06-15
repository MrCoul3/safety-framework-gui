import { AppStore } from "./AppStore";
import { makeAutoObservable, toJS } from "mobx";
import {
  EMPLOYEES,
  INSPECTION_FORM_COMMON_FIELDS,
  INSPECTION_FORM_REQUIRED_FIELDS,
  inspectionFieldsDictNames,
  InspectionFormTypes,
} from "../enums/InspectionFormTypes";
import { employeesEndpoint, instance } from "../api/endpoints";
import {
  ELEMENTS_ON_FIELD,
  isDevelop,
  LOCAL_STORE_INSPECTIONS,
} from "../constants/config";
import moment from "moment/moment";
import { IInspection } from "../interfaces/IInspection";
import { joinObjectValues } from "../utils/joinObjectValues";
import { expandFilter } from "../constants/filters";
import {
  IFieldsData,
  IFilterDateRangeFieldValue,
  IFormDateFieldValue,
  IFormFieldValue,
  Item,
} from "../interfaces/IFieldInterfaces";
import { IFreeForm } from "../interfaces/IFreeForm";
import {
  FREE_FORM_COMMON_FIELDS,
  freeFormDictNames,
  FreeFormFieldTypes,
  FreeFormTypes,
} from "../enums/FreeFormTypes";
import { RoutesTypes } from "../enums/RoutesTypes";
import { filterByRequiredFields } from "../utils/filterByRequiredFields";
import { ViolationFilterTypes } from "../enums/ViolationFilterTypes";
import { IFilledBarrier } from "../interfaces/IFilledBarrier";
import i18next from "i18next";

export class InspectionStore {
  private store: AppStore;

  constructor(store: AppStore) {
    this.store = store;
    makeAutoObservable(this);
  }
  savingState: boolean = false;
  setSavingState(val: boolean) {
    this.savingState = val;
  }
  clearSavingState() {
    this.savingState = false;
  }
  fieldsData: IFieldsData[] = [];
  isValidate: boolean = false;
  searchFieldValue: string | null = null;
  setIsValidate(value: boolean) {
    this.isValidate = value;
  }
  setSearchFieldValue(value: string | null) {
    this.searchFieldValue = value;
    console.log("this.searchFieldValue", this.searchFieldValue);
  }
  formFieldsValues: IInspection | {} = {};

  async sendInspection() {
    try {
      const response = await instance.post(`Inspections`, {
        ...this.formFieldsValues,
        filledFreeForms: this.store.freeFormStore.filledFreeForms,
        filledBarriers: this.store.barriersStore.filledBarriers,
      });
      if (!response.data.error) {
        return "success";
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getFieldDataDev(type: InspectionFormTypes | FreeFormFieldTypes) {
    let requestType: any = type;

    console.log("getFieldDataDev requestType", requestType);

    if (INSPECTION_FORM_COMMON_FIELDS.includes(type as InspectionFormTypes)) {
      requestType = inspectionFieldsDictNames[type as InspectionFormTypes];
    }
    if (FREE_FORM_COMMON_FIELDS.includes(type as FreeFormFieldTypes)) {
      if (type !== FreeFormFieldTypes.ViolationManual) {
        requestType = freeFormDictNames[type as FreeFormFieldTypes];
      }
    }
    if (EMPLOYEES.includes(type as InspectionFormTypes)) {
      requestType = employeesEndpoint;
    }

    try {
      const response = await instance.get(requestType);
      this.setFieldsData({
        [type + "Count"]: 321,
      });
      if (!response.data.error) {
        this.setFieldsData({ [type]: response.data });
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getFieldData(
    type:
      | InspectionFormTypes
      | FreeFormFieldTypes
      | ViolationFilterTypes
      | string,
  ) {
    let requestType: any = type;

    const searchFieldValue = this.searchFieldValue ?? "";

    const item: Item = { title: "title", personFio: "personFio" };

    let itemValue = item.title;

    if (INSPECTION_FORM_COMMON_FIELDS.includes(type as InspectionFormTypes)) {
      requestType = inspectionFieldsDictNames[type as InspectionFormTypes];
    }
    if (FREE_FORM_COMMON_FIELDS.includes(type as FreeFormFieldTypes)) {
      requestType = freeFormDictNames[type as FreeFormFieldTypes];
    }
    if (EMPLOYEES.includes(type as InspectionFormTypes)) {
      requestType = employeesEndpoint;
      itemValue = item.personFio as string;
    }

    let filter = searchFieldValue
      ? `$filter=contains(${itemValue},'${searchFieldValue}')`
      : "";

    let offset = searchFieldValue
      ? ""
      : `&$skip=${this.offset}&$top=${ELEMENTS_ON_FIELD}`;

    const countFilter = this.searchFieldValue ? "" : `&$count=true`;

    try {
      const response = await instance.get(
        `${requestType}?${filter}${offset}${countFilter}`,
      );
      if (!response.data.error) {
        const count = response.data["@odata.count"];
        if (count) {
          this.setFieldsData({
            [type + "Count"]: count,
          });
        }
        if (response.data.value) {
          this.setFieldsData({
            [type]: response.data.value,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  setFieldsData(value: IFieldsData) {
    console.log("setFieldsData value", value);
    const keyValue = Object.keys(value)[0];
    console.log("setFieldsData keyValue", keyValue);
    if (!keyValue.includes("Count")) {
      const foundField = this.fieldsData.find((field) =>
        Object.keys(field).includes(keyValue),
      );
      console.log("setFieldsData foundField", foundField);

      if (foundField) {
        const newValue = joinObjectValues(foundField, value);
        console.log("setFieldsData newValue", newValue);
        const countField = this.fieldsData.find((field) => {
          if (Object.keys(field)[0].includes("Count")) {
            return field;
          }
        });
        console.log("setFieldsData countField", toJS(countField));
        if (countField) {
          this.fieldsData = [countField, newValue];
        } else {
          this.fieldsData = [newValue];
        }
        console.log("setFieldsData fieldsData", toJS(this.fieldsData));
        return;
      }
    }
    this.fieldsData = [...this.fieldsData, value];
    console.log("this.fieldsData", toJS(this.fieldsData));
  }
  clearFieldsData() {
    this.fieldsData = [];
    console.log("this.fieldsData", toJS(this.fieldsData));
  }

  setFormFieldsValues(value: IInspection) {
    this.formFieldsValues = value;
    console.debug("formFieldsValues: ", toJS(this.formFieldsValues));
  }

  setFilledBarriers(filledBarriers: IFilledBarrier[]) {
    this.formFieldsValues = {
      ...this.formFieldsValues,
      filledBarriers: filledBarriers,
    };
  }

  setFilledFreeForms(filledFreeForms: (IFreeForm | {})[]) {
    this.formFieldsValues = {
      ...this.formFieldsValues,
      filledFreeForms: filledFreeForms,
    };
    console.log(
      "setFilledFreeForms this.formFieldsValues",
      toJS(this.formFieldsValues),
    );
  }

  updateFormFieldsValues(
    value: IFormFieldValue | IFormDateFieldValue | IFilterDateRangeFieldValue,
  ) {
    console.log("updateFormFieldsValues", value);
    if (this.formFieldsValues) {
      const key = Object.keys(value)[0];
      const excluded = [
        ViolationFilterTypes.Date,
        InspectionFormTypes.AuditDate,
      ];
      if (
        !excluded.includes(key as ViolationFilterTypes | InspectionFormTypes)
      ) {
        const values = Object.values(value)[0] as Item;
        const valueId = {
          [key + "Id"]: values ? (values.id ? +values.id : values.id) : null,
        };
        Object.assign(this.formFieldsValues, valueId);
      }
      Object.assign(this.formFieldsValues, value);
    }
    Object.assign(this.formFieldsValues, value);

    console.debug("formFieldsValues: ", toJS(this.formFieldsValues));
  }
  offset: number = 0;
  setOffset(value: number) {
    this.offset = value;
    console.log("field offset", this.offset);
  }
  increaseOffset() {
    this.offset = this.offset + ELEMENTS_ON_FIELD;
    console.log("field offset", this.offset);
  }
  clearOffset() {
    this.offset = 0;
    console.log("field offset", this.offset);
  }

  async getInspectionDev(editInspectionId: string) {
    this.store.loaderStore.setLoader("wait");

    try {

      setTimeout( async () => {
        const response = await instance.get(`inspections/${editInspectionId}`);
        if (!response.data.error) {
          const result = response.data;
          const inspection = {
            ...result,
            auditDate: moment(result.auditDate).toDate(),
          };
          this.setFormFieldsValues(inspection);
          console.log("getInspectionDev");
        }
        this.store.loaderStore.setLoader("ready");
      }, 200);
    } catch (e) {
      this.store.loaderStore.setLoader("ready");
      console.error(e);
    }
  }

  cropExtraValuesFromInspection() {
    console.log("REQUIRED_FIELDS", INSPECTION_FORM_REQUIRED_FIELDS);
    const inspectionFormTypesValues = INSPECTION_FORM_REQUIRED_FIELDS;
    const formFieldsValuesKeys = Object.keys(this.formFieldsValues);
    const formFieldsValues = this.formFieldsValues as { [key: string]: Item };
    formFieldsValuesKeys.forEach((formFieldsValuesKey) => {
      if (
        !inspectionFormTypesValues.includes(
          formFieldsValuesKey as InspectionFormTypes,
        )
      ) {
        delete formFieldsValues[formFieldsValuesKey];
      }
    });
    return formFieldsValues;
  }
  cropExtraValuesFromFreeForm() {
    const freeFormTypesValues = Object.values(FreeFormTypes);
    const formFieldsValuesKeys = Object.keys(this.formFieldsValues);
    const formFieldsValues = this.formFieldsValues as { [key: string]: Item };
    formFieldsValuesKeys.forEach((formFieldsValuesKey) => {
      if (!freeFormTypesValues.includes(formFieldsValuesKey as FreeFormTypes)) {
        delete formFieldsValues[formFieldsValuesKey];
      }
    });
    return formFieldsValues;
  }

  async getInspectionById(editInspectionId: string) {
    this.store.loaderStore.setLoader("wait");

    try {
      const response = await instance.get(
        `Inspections?$filter=(id eq ${editInspectionId})&$expand=${expandFilter}`,
      );
      if (!response.data.error) {
        if (response.data.value) {
          const result = response.data.value[0];
          const inspection = {
            ...result,
            auditDate: moment(result.auditDate).toDate(),
          };
          this.setFormFieldsValues(inspection);
        }
      }
      this.store.loaderStore.setLoader("ready");
    } catch (e) {
      this.store.loaderStore.setLoader("ready");
      console.error(e);
    }
  }

  clearInspectionForm() {
    this.formFieldsValues = {};
    console.log(
      "clearInspectionForm this.formFieldsValues",
      toJS(this.formFieldsValues),
    );
  }

  checkIsFormSuccess(inspection?: IInspection) {
    const formFieldsValues: { [key: string]: any } = inspection
      ? inspection
      : this.formFieldsValues;
    const filtered = filterByRequiredFields(
      formFieldsValues,
      INSPECTION_FORM_REQUIRED_FIELDS,
    );
    return (
      filtered.every((value) => {
        return Object.values(value ?? {})[0];
      }) && filtered.length === INSPECTION_FORM_REQUIRED_FIELDS.length
    );
  }

  setInspectionToLocalStorage() {
    delete (this.formFieldsValues as IInspection)?.id;
    const filledFreeForms = this.store.freeFormStore.filledFreeForms;
    const filledBarriers = this.store.barriersStore.filledBarriers;
    console.log(
      "setInspectionToLocalStorage filledFreeForms",
      toJS(filledFreeForms),
    );
    console.log(
      "setInspectionToLocalStorage filledBarriers",
      toJS(filledBarriers),
    );
    const localInspections = localStorage.getItem(LOCAL_STORE_INSPECTIONS);

    let values = this.formFieldsValues;
    if (filledFreeForms.length) {
      // если есть свободные формы добавляем к занчениям формы еще и freeForms
      values = { ...this.formFieldsValues, filledFreeForms };
    }
    if (filledBarriers.length) {
      // если есть барьеры добавляем к занчениям формы еще и filledBarriers
      values = { ...this.formFieldsValues, filledBarriers };
    }

    if (localInspections) {
      console.log("setInspectionToLocalStorage1", values);

      const localInspectionsParsed = JSON.parse(localInspections);
      if (localInspectionsParsed) {
        localInspectionsParsed.unshift(values);
      }
      const newInspectionsJson = JSON.stringify(localInspectionsParsed);
      localStorage.setItem(LOCAL_STORE_INSPECTIONS, newInspectionsJson);
    } else {
      console.log("setInspectionToLocalStorage2", values);

      const newInspectionJson = JSON.stringify([values]);
      console.log("newInspectionJson", newInspectionJson);
      localStorage.setItem(LOCAL_STORE_INSPECTIONS, newInspectionJson);
    }
  }
  updateInspectionToLocalStorage(editInspectionId: string) {
    const index = +editInspectionId - 1;
    const localInspections = localStorage.getItem(LOCAL_STORE_INSPECTIONS);
    if (localInspections) {
      const localInspectionsParsed = JSON.parse(localInspections);
      if (localInspectionsParsed.length) {
        localInspectionsParsed.splice(index, 1);
        localInspectionsParsed.unshift(this.formFieldsValues);
        const newInspectionsJson = JSON.stringify(localInspectionsParsed);
        localStorage.setItem(LOCAL_STORE_INSPECTIONS, newInspectionsJson);
      }
    }
  }

  deleteInspectionFromLocalStorage(editInspectionId: number) {
    const index = +editInspectionId;
    const localInspections = localStorage.getItem(LOCAL_STORE_INSPECTIONS);
    if (localInspections) {
      const localInspectionsParsed = JSON.parse(localInspections);
      if (localInspectionsParsed.length) {
        localInspectionsParsed.splice(index, 1);
        const newInspectionsJson = JSON.stringify(localInspectionsParsed);
        localStorage.setItem(LOCAL_STORE_INSPECTIONS, newInspectionsJson);
      }
    }
  }

  loadInspectionFromLocalStorage(id: string) {
    console.log("loadInspectionFromLocalStorage");
    const localInspections = localStorage.getItem(LOCAL_STORE_INSPECTIONS);
    if (localInspections) {
      const localInspectionsParsed = JSON.parse(localInspections);
      const inspection = {
        ...localInspectionsParsed[+id - 1],
        auditDate: localInspectionsParsed[+id - 1].auditDate
          ? moment(localInspectionsParsed[+id - 1].auditDate).toDate()
          : null,
      };
      this.setFormFieldsValues(inspection);
    }
  }

  handleOpenField(type: InspectionFormTypes) {
    if (isDevelop) {
      this.getFieldDataDev(type);
      this.getFieldData(type);
    } else {
      this.getFieldData(type);
    }
  }

  async loadInspection(editInspectionId: string) {
    console.log("loadInspection");
    if (location.pathname.includes(RoutesTypes.EditLocalInspection)) {
      this.loadInspectionFromLocalStorage(editInspectionId);
    }
    if (location.pathname.includes(RoutesTypes.EditInspection)) {
      if (isDevelop) {
        await this.getInspectionDev(editInspectionId);
        await this.getInspectionById(editInspectionId);
      } else {
        await this.getInspectionById(editInspectionId);
      }
    }
  }
}
