import { AppStore } from "./AppStore";
import { makeAutoObservable, toJS } from "mobx";
import { EMPLOYEES, InspectionFormTypes } from "../enums/InspectionFormTypes";
import { employeesEndpoint, instance } from "../api/endpoints";
import {
  ELEMENTS_ON_FIELD,
  INSPECTIONS_ON_PAGE,
  isDevelop,
  LOCAL_STORE_INSPECTIONS,
} from "../constants/config";
import moment from "moment/moment";
import { IInspection } from "../interfaces/IInspection";
import { joinObjectValues } from "../utils/joinObjectValues";
import { expandFilter } from "../constants/filters";
import {
  IFieldsData,
  IFormDateFieldValue,
  IFormFieldValue,
  Item,
} from "../interfaces/IFieldInterfaces";
import {IFreeForm} from "../interfaces/IFreeForm";

export class InspectionStore {
  private store: AppStore;

  constructor(store: AppStore) {
    this.store = store;
    makeAutoObservable(this);
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
  formFieldsValues: IInspection | IFreeForm | {} = {};

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
  updateFormFieldsValues(value: IFormFieldValue | IFormDateFieldValue) {
    if (this.formFieldsValues) {
      const key = Object.keys(value)[0];
      if (key !== InspectionFormTypes.AuditDate) {
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

  async getFieldDataDev(type: InspectionFormTypes) {
    let requestType: any = type + "s";

    if (EMPLOYEES.includes(type)) {
      requestType = employeesEndpoint;
    }

    try {
      const response = await instance.get(requestType);
      this.setFieldsData({
        [type + "Count"]: 321,
      });
      if (!response.data.error) {
        this.setFieldsData({ [type]: response.data });
        console.log("getFieldDataDev");
      }
    } catch (e) {
      console.error(e);
    }
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

  async getFieldData(type: InspectionFormTypes) {
    let requestType: any = type + "s";

    const searchFieldValue = this.searchFieldValue ?? "";

    const itemValue: Item = { title: "title", personFio: "personFio" };

    let filter = searchFieldValue
      ? `$filter=contains(${itemValue.title},'${searchFieldValue}')`
      : "";

    let offset = searchFieldValue
      ? ""
      : `&$skip=${this.offset}&$top=${ELEMENTS_ON_FIELD}`;

    if (EMPLOYEES.includes(type)) {
      requestType = employeesEndpoint;
      filter = searchFieldValue
        ? `$filter=contains(${itemValue.personFio},'${searchFieldValue}')`
        : "";
    }

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

  async getInspectionDev(editInspectionId: string) {
    try {
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
    } catch (e) {
      console.error(e);
    }
  }

  cropExtraValuesFromInspection() {
    const inspectionFormTypesValues = Object.values(InspectionFormTypes);
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

  async getInspectionById(editInspectionId: string) {
    try {
      const response = await instance.get(
        `Inspections?$filter=(id eq ${editInspectionId})&$expand=${expandFilter}`,
      );
      if (!response.data.error) {
        if (response.data.value) {
          const result = response.data.value;
          const inspection = {
            ...result,
            auditDate: moment(result.auditDate).toDate(),
          };
          this.setFormFieldsValues(inspection);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  clearInspectionForm() {
    this.formFieldsValues = {};
  }

  checkIsFormSuccess() {
    const formFieldsValues = this.cropExtraValuesFromInspection();

    if (formFieldsValues) {
      return (
        Object.keys(InspectionFormTypes).length ===
          Object.keys(formFieldsValues).length &&
        !Object.values(formFieldsValues).some((field) => field === null)
      );
    }
    return false;
  }

  setInspectionToLocalStorage() {
    delete (this.formFieldsValues as IInspection)?.id;

    const localInspections = localStorage.getItem(LOCAL_STORE_INSPECTIONS);
    if (localInspections) {
      const localInspectionsParsed = JSON.parse(localInspections);
      if (localInspectionsParsed) {
        localInspectionsParsed.unshift(this.formFieldsValues);
      }
      const newInspectionsJson = JSON.stringify(localInspectionsParsed);
      localStorage.setItem(LOCAL_STORE_INSPECTIONS, newInspectionsJson);
    } else {
      const newInspectionJson = JSON.stringify([this.formFieldsValues]);
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

  deleteInspectionFromLocalStorage(editInspectionId: string) {
    const index = +editInspectionId - 1;
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
    const localInspections = localStorage.getItem(LOCAL_STORE_INSPECTIONS);
    if (localInspections) {
      const localInspectionsParsed = JSON.parse(localInspections);
      const inspection = {
        ...localInspectionsParsed[+id - 1],
        auditDate: moment(localInspectionsParsed[+id - 1].auditDate).toDate(),
      };
      this.setFormFieldsValues(inspection);
    }
  }

  handleOpenField(type: InspectionFormTypes) {
    const foundField = !!this.fieldsData.find((data) =>
      Object.keys(data).includes(type),
    );
    if (!foundField) {
      if (isDevelop) {
        this.getFieldDataDev(type);
      } else {
        this.getFieldData(type);
      }
    }
  }
}
