import { AppStore } from "./AppStore";
import { makeAutoObservable, toJS } from "mobx";
import { LOCAL_STORE_INSPECTIONS } from "../constants/config";
import { IFreeForm } from "../interfaces/IFreeForm";
import {
  FREE_FORM_REQUIRED_FIELDS,
  FreeFormFieldTypes,
  FreeFormTypes,
  NOT_OTHER_COND_FREE_FORM_REQUIRED_FIELDS,
  OTHER_COND_FREE_FORM_REQUIRED_FIELDS,
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
    console.log('setFreeForm this.filledFreeForms', toJS(this.filledFreeForms))
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
        targetInspection.filledBarriers = [];
        if (
          targetInspection.filledFreeForms && targetInspection.filledFreeForms.length &&
          targetInspection.filledFreeForms[freeFormIndex]
        ) {
          targetInspection.filledFreeForms[freeFormIndex] =
            this.filledFreeForms[freeFormIndex];
        } else {
          targetInspection.filledFreeForms = []
          targetInspection.filledFreeForms.push(
            this.filledFreeForms[freeFormIndex],
          );
        }
        localInspectionsParsed[index] = targetInspection;
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
        localInspectionsParsed[index] = this.store.inspectionStore.formFieldsValues
        const targetInspection = localInspectionsParsed[index];
        targetInspection.filledFreeForms = this.filledFreeForms;
        targetInspection.filledBarriers = [];
        localInspectionsParsed.splice(index, 1);
        localInspectionsParsed.unshift(targetInspection);
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

  isOtherCondition(formFieldsValues: IFreeForm) {
    const isViolationTypeOther =
      formFieldsValues?.[FreeFormFieldTypes.ViolationType]?.id.toString() ===
      "1";
    const isViolationCategoryOther =
      formFieldsValues[FreeFormFieldTypes.ViolationCategory]?.id.toString() ===
      "1";
    return isViolationTypeOther && isViolationCategoryOther;
  }

  getFreeFormRequireFields(formFieldsValues?: IFreeForm) {
    if (formFieldsValues && this.isOtherCondition(formFieldsValues)) {
      return OTHER_COND_FREE_FORM_REQUIRED_FIELDS;
    } else {
      return NOT_OTHER_COND_FREE_FORM_REQUIRED_FIELDS;
    }
  }

  checkIsFreeFormSuccess() {
    const formFieldsValues: { [key: string]: any }[] = this
      .filledFreeForms as IFreeForm[];

    console.log(
      "checkIsFreeFormSuccess formFieldsValues ",
      toJS(formFieldsValues),
    );

    if (formFieldsValues && formFieldsValues.length) {
      const filtered = formFieldsValues.map((freeForm) => {
        const requireFields = this.getFreeFormRequireFields(
          freeForm as IFreeForm,
        );

        return filterByRequiredFields(freeForm, requireFields);
      });

      console.log("filtered", toJS(filtered));

      const result = filtered.map((freeForm) => {
        if (freeForm) {
          const requireFields = this.getFreeFormRequireFields(
            freeForm as unknown as IFreeForm,
          );
          return Object.values(freeForm).every(
            (value) =>
              Object.values(value ?? {})[0] &&
              Object.values(freeForm).length === requireFields.length,
          );
        }
      }); // [bool, bool]
      return result.every((res) => res);
    }
    return false;
  }
}
