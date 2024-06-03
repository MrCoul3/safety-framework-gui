import { AppStore } from "./AppStore";
import { makeAutoObservable, toJS } from "mobx";
import { LOCAL_STORE_INSPECTIONS } from "../constants/config";
import { IFreeForm } from "../interfaces/IFreeForm";
import {
  FREE_FORM_REQUIRED_FIELDS,
  FreeFormFieldTypes,
  FreeFormTypes,
} from "../enums/FreeFormTypes";
import { IEntity } from "../interfaces/IEntity";
import { IInspection } from "../interfaces/IInspection";
import {
  IFormDateFieldValue,
  IFormFieldValue,
  Item,
} from "../interfaces/IFieldInterfaces";
import { filterByRequiredFields } from "../utils/filterByRequiredFields";

export class FreeFormStore {
  private store: AppStore;

  constructor(store: AppStore) {
    this.store = store;
    makeAutoObservable(this);
  }

  filledFreeForms: (IFreeForm | {})[] = [];
  setFreeForm(value: IFreeForm[]) {
    this.filledFreeForms = value;
  }
  addFreeForm() {
    this.filledFreeForms = [
      ...this.filledFreeForms,
      this.getFreeFormTemplate(),
    ];
    console.log("this.filledFreeForms", toJS(this.filledFreeForms));
  }

  clearFreeForm(index: number) {
    this.filledFreeForms[index] = this.getFreeFormTemplate();
  }
  deleteFreeForm(index: number) {
    this.filledFreeForms = this.filledFreeForms.filter(
      (item, i) => index !== i,
    );
  }

  clearFreeForms() {
    this.filledFreeForms = [];
  }

  getFreeFormTemplate() {
    const template = {};
    Object.values(FreeFormFieldTypes).forEach((type) => {
      Object.assign(template, { [type]: null });
    });
    return template;
  }

  saveEditInspectionFreeFormToLocalStorage(
    editInspectionId: string,
    freeFormIndex: number,
  ) {
    const index = +editInspectionId - 1;
    console.log("saveFreeFormToLocalStorage index", toJS(index));

    const localInspections = localStorage.getItem(LOCAL_STORE_INSPECTIONS);
    if (localInspections) {
      const localInspectionsParsed = JSON.parse(localInspections);
      if (localInspectionsParsed.length) {
        const targetInspection = localInspectionsParsed[index];
        console.log(
          "saveFreeFormToLocalStorage targetInspection",
          toJS(targetInspection),
        );
        if (
          targetInspection.filledFreeForms &&
          targetInspection.filledFreeForms[freeFormIndex]
        ) {
          targetInspection.filledFreeForms[freeFormIndex] =
            this.filledFreeForms[freeFormIndex];
        } else {
          targetInspection.filledFreeForms.push(
            this.filledFreeForms[freeFormIndex],
          );
        }
        localInspectionsParsed.splice(index, 1);
        localInspectionsParsed.push(targetInspection);
        const newInspectionsJson = JSON.stringify(localInspectionsParsed);
        localStorage.setItem(LOCAL_STORE_INSPECTIONS, newInspectionsJson);
      }
    }
  }

  updateInspectionToLocalStorage(editInspectionId: string) {
    const index = +editInspectionId - 1;
    const localInspections = localStorage.getItem(LOCAL_STORE_INSPECTIONS);
    if (localInspections) {
      const localInspectionsParsed = JSON.parse(localInspections);
      if (localInspectionsParsed.length) {
        const targetInspection = localInspectionsParsed[index];
        targetInspection.filledFreeForms = this.filledFreeForms;
        localInspectionsParsed.splice(index, 1);
        localInspectionsParsed.push(targetInspection);
        const newInspectionsJson = JSON.stringify(localInspectionsParsed);
        localStorage.setItem(LOCAL_STORE_INSPECTIONS, newInspectionsJson);
      }
    }
  }
  updateFormFieldsValues(
    value: IFormFieldValue | IFormDateFieldValue,
    index: number,
  ) {
    console.log("updateFormFieldsValues", value);
    const formFieldsValues = this.filledFreeForms[index];
    if (formFieldsValues) {
      const key = Object.keys(value)[0];
      const values = Object.values(value)[0] as Item;
      const valueId = {
        [key + "Id"]: values ? (values.id ? +values.id : values.id) : null,
      };
      Object.assign(formFieldsValues, valueId);
      Object.assign(formFieldsValues, value);
    }
    this.filledFreeForms[index] = formFieldsValues;
    console.debug(
      "freeform this.filledFreeForms: ",
      toJS(this.filledFreeForms),
    );
  }

  checkIsFreeFormSuccess() {
    const formFieldsValues: { [key: string]: any }[] = this
      .filledFreeForms as IFreeForm[];


    console.log(
      "checkIsFreeFormSuccess formFieldsValues ",
      toJS(formFieldsValues),
    );
    if (formFieldsValues && formFieldsValues.length) {
      const filtered = formFieldsValues.map((freeForm) =>
        filterByRequiredFields(freeForm, FREE_FORM_REQUIRED_FIELDS),
      );

      console.log("filtered", toJS(filtered));

      const result = filtered.map((freeForm) =>
        Object.values(freeForm).every(
          (value) =>
            Object.values(value ?? {})[0] &&
            Object.values(freeForm).length === FREE_FORM_REQUIRED_FIELDS.length,
        ),
      ); // [bool, bool]
      return result.every((res) => res);
    }
    return false;
  }
}
