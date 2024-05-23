import { AppStore } from "./AppStore";
import { makeAutoObservable, toJS } from "mobx";
import { EMPLOYEES, InspectionFormTypes } from "../enums/InspectionFormTypes";
import {
  employeesEndpoint,
  instance,
} from "../api/endpoints";
import {
  ELEMENTS_ON_FIELD,
  INSPECTIONS_ON_PAGE,
  isDevelop,
  LOCAL_STORE_INSPECTIONS,
} from "../constants/config";
import moment from "moment/moment";
import { IInspection } from "../interfaces/IInspection";

export interface IFieldsData {
  [key: string]: Item[] | number;
}
export type Item = {
  title: string;
  id?: string;
  personFio?: string;
};

export interface IFormFieldValue {
  [key: string]: Item | null;
}
export interface IFormDateFieldValue {
  [key: string]: [Date?, Date?] | null;
}
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
  formFieldsValues: IInspection | {} = {};

  setFieldsData(value: IFieldsData) {
    this.fieldsData = [...this.fieldsData, value];
    console.log("this.fieldsData", toJS(this.fieldsData));
  }

  setFormFieldsValues(value: IInspection) {
    this.formFieldsValues = value;
    // Object.assign(this.formFieldsValues, value);
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
      }
    } catch (e) {
      console.error(e);
    }
  }

  inspectionOffset: number = 0;
  setInspectionOffset(value: number) {
    this.inspectionOffset = value;
  }
  increaseInspectionOffset() {
    this.inspectionOffset = this.inspectionOffset + ELEMENTS_ON_FIELD;
  }
  clearInspectionOffset() {
    this.inspectionOffset = 0;
  }

  async getFieldData(type: InspectionFormTypes) {

    let requestType: any = type + "s";

    const searchFieldValue = this.searchFieldValue ?? ""

    const itemValue: Item = { title: "title", personFio: "personFio" };

    let filter = `$filter=contains(${itemValue.title},${searchFieldValue}')`;

    if (EMPLOYEES.includes(type)) {
      requestType = employeesEndpoint;
      filter = `$filter=contains(${itemValue.personFio},${searchFieldValue})`;
    }

    const countFilter = this.searchFieldValue ? "" : `&$count=true`;

    try {
      const response = await instance.get(
        `${requestType}?${filter}&$skip=${this.inspectionOffset}&$top=${this.inspectionOffset + ELEMENTS_ON_FIELD}${countFilter}`,
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
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getInspectionById(editInspectionId: string) {
    try {
      const response = await instance.get(
        `Inspections?$filter=(id eq ${editInspectionId})`,
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
    if (this.formFieldsValues) {
      return (
        Object.keys(InspectionFormTypes).length ===
          Object.keys(this.formFieldsValues).length &&
        !Object.values(this.formFieldsValues).some((field) => field === null)
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
        // this.getFieldData(type);
      } else {
        this.getFieldData(type);
      }
    }
  }
}
