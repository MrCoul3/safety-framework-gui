import { AppStore } from "./AppStore";
import { makeAutoObservable, toJS } from "mobx";
import { instance, localDevInstance } from "../api/endpoints";
import { IBarrier } from "../interfaces/IBarrier";
import { IFilledBarrier } from "../interfaces/IFilledBarrier";
import { IFormFieldTextValue } from "../interfaces/IFieldInterfaces";
import { LOCAL_STORE_INSPECTIONS } from "../constants/config";
import { IFulfillment } from "../interfaces/IFulfillment";
import { IFilledQuestions } from "../interfaces/IFilledQuestions";
import { FilledQuestionTypes } from "../enums/FilledQuestionTypes";
import { IFilledRequirements } from "../interfaces/IFilledRequirements";
import { IInapplicableReasons } from "../interfaces/IInapplicableReasons";
import { IFreeForm } from "../interfaces/IFreeForm";
import { filterByRequiredFields } from "../utils/filterByRequiredFields";
import { BarrierFieldTypes } from "../enums/BarrierTypes";
import { IRequirement } from "../interfaces/IRequirement";
import { IQuestion } from "../interfaces/IQuestion";

export class BarriersStore {
  private store: AppStore;

  constructor(store: AppStore) {
    this.store = store;
    makeAutoObservable(this);
  }

  filledBarriers: IFilledBarrier[] = [];
  barriers: IBarrier[] = [];
  fulfillments: IFulfillment[] = [];
  inapplicableReasons: IInapplicableReasons[] = [];

  clearBarriers() {
    this.filledBarriers = []
  }
  async getBarriersDev() {
    try {
      const response = await localDevInstance.get(`barriers`);
      if (!response.data.error) {
        this.setBarriers(response.data);
      }
    } catch (e) {
      console.error(e);
    }
  }
  async getBarriers(passportId: string) {
    try {
      const response = await instance.get(
        `barriers?$filter=(passportId eq ${passportId})and(IsActual eq true)&$expand=requirements($expand=questions)&$count=true`,
      );
      if (!response.data.error) {
        if (response.data.value) {
          this.setBarriers(response.data.value);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
  async getFulfillments() {
    try {
      const response = await instance.get(`fulfillments`);
      if (!response.data.error) {
        if (response.data.value) {
          this.setFulfillments(response.data.value);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
  async getFulfillmentsDev() {
    try {
      const response = await instance.get(`fulfillments`);
      if (!response.data.error) {
        if (response.data) {
          this.setFulfillments(response.data);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getInapplicableReasons() {
    try {
      const response = await instance.get(`inapplicableReasons`);
      if (!response.data.error) {
        if (response.data.value) {
          this.setInapplicableReasons(response.data.value);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
  async getInapplicableReasonsDev() {
    try {
      const response = await instance.get(`inapplicableReasons`);
      if (!response.data.error) {
        if (response.data) {
          this.setInapplicableReasons(response.data);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  getFoundBarriersById(barrierId: number) {
    return this.filledBarriers.filter(
      (barrier) => barrier.barrierId === barrierId,
    );
  }
  filterBarriersFromBarrierId(barrierId: number) {
    this.filledBarriers = this.filledBarriers.filter(
      (barrier) => barrier.barrierId !== barrierId,
    );
  }
  changeFormFieldsValues(
    value: IFormFieldTextValue,
    barrierId: number,
    index: number,
  ) {
    const foundBarriersById = this.getFoundBarriersById(barrierId);
    const activeBarrier = foundBarriersById[index];
    const key = Object.keys(value)[0];
    const val = Object.values(value)[0];
    if (activeBarrier) {
      activeBarrier[key] = val;
      console.log("changeFormFieldsValues activeBarrier", toJS(activeBarrier));
      console.log("changeFormFieldsValues key", key);
    }
  }
  vehicleFieldValue: string | null = null
  setVehicleFieldValue(value: string | null) {
    this.vehicleFieldValue = value;
  }
  licencePlateFieldValue: string | null = null
  setLicencePlateFieldValue(value: string | null) {
    this.licencePlateFieldValue = value;
  }
  driverFioFieldValue: string | null = null
  setDriverFioFieldValue(value: string | null) {
    this.driverFioFieldValue = value;
  }
  setBarriers(value: IBarrier[]) {
    this.barriers = value;
    console.debug("barriers: ", toJS(this.barriers));
  }
  setFulfillments(value: IFulfillment[]) {
    this.fulfillments = value;
    console.debug("fulfillments: ", toJS(this.fulfillments));
  }
  setInapplicableReasons(value: IInapplicableReasons[]) {
    this.inapplicableReasons = value;
    console.debug("inapplicableReasons: ", toJS(this.inapplicableReasons));
  }
  setFilledBarriers(value: IFilledBarrier[]) {
    this.filledBarriers = value;
    console.debug("filledBarriers: ", toJS(this.filledBarriers));
  }
  addFilledBarriers(value: IFilledBarrier) {
    this.filledBarriers = [...this.filledBarriers, value];
    console.debug("filledBarriers: ", toJS(this.filledBarriers));
  }

  deleteFilledBarrier(barrierId: number, index: number) {
    const foundBarriersById = this.getFoundBarriersById(barrierId);
    foundBarriersById.splice(index, 1);
    this.filterBarriersFromBarrierId(barrierId);
    this.filledBarriers = [...this.filledBarriers, ...foundBarriersById];
  }

  clearFilledBarrier(barrierId: number, index: number, value: IFilledBarrier) {
    let foundBarriersById = this.getFoundBarriersById(barrierId);
    this.filterBarriersFromBarrierId(barrierId);
    foundBarriersById = foundBarriersById.map((bar, ind) =>
      ind === index ? value : bar,
    );
    this.filledBarriers = [...this.filledBarriers, ...foundBarriersById];
    console.log(
      "clearFilledBarrier this.filledBarriers",
      toJS(this.filledBarriers),
    );
  }

  updateFilledQuestions(
    value: IFilledQuestions,
    barrierId: number,
    index: number,
  ) {
    const foundBarriersById = this.getFoundBarriersById(barrierId);
    const activeBarrier = foundBarriersById[index];
    let filledRequirements = activeBarrier?.filledRequirements;
    const filledQuestions = filledRequirements?.find(
      (fillReq) =>
        fillReq.requirementId ===
        value[FilledQuestionTypes.FilledRequirementId],
    )?.filledQuestions;

    const newFilledQuestions = filledQuestions?.map((fillQ) => {
      if (
        fillQ[FilledQuestionTypes.QuestionId] ===
        value[FilledQuestionTypes.QuestionId]
      ) {
        return value;
      }
      return fillQ;
    });

    filledRequirements
      ? filledRequirements?.map((fillReq) => {
          if (newFilledQuestions && newFilledQuestions.length) {
            const fillQReqId = newFilledQuestions[0].filledRequirementId;
            if (fillReq.requirementId === fillQReqId) {
              fillReq.filledQuestions = newFilledQuestions;
            }
          }
          return fillReq;
        })
      : [];

    console.log(
      "updateFilledQuestions this.filledBarriers",
      toJS(this.filledBarriers),
    );
  }

  updateInspectionToLocalStorage(editInspectionId: string) {
    const index = +editInspectionId - 1;
    const localInspections = localStorage.getItem(LOCAL_STORE_INSPECTIONS);
    if (localInspections) {
      const localInspectionsParsed = JSON.parse(localInspections);
      if (localInspectionsParsed.length) {
        localInspectionsParsed[index] =
          this.store.inspectionStore.formFieldsValues;
        const targetInspection = localInspectionsParsed[index];
        targetInspection.filledBarriers = this.filledBarriers;
        targetInspection.filledFreeForms = [];
        localInspectionsParsed.splice(index, 1);
        localInspectionsParsed.unshift(targetInspection);
        const newInspectionsJson = JSON.stringify(localInspectionsParsed);
        localStorage.setItem(LOCAL_STORE_INSPECTIONS, newInspectionsJson);
      }
    }
  }

  saveFilledBarrierToLocalStorage(
    editInspectionId: string,
    barrierId: number,
    barrierIndex: number,
  ) {
    const foundBarriersById = this.getFoundBarriersById(barrierId);
    const activeBarrier = foundBarriersById[barrierIndex];

    const index = +editInspectionId - 1;
    const localInspections = localStorage.getItem(LOCAL_STORE_INSPECTIONS);
    if (localInspections) {
      const localInspectionsParsed = JSON.parse(localInspections);
      if (localInspectionsParsed.length) {
        const targetInspection = localInspectionsParsed[index];
        console.log(
          "saveFilledBarrierToLocalStorage targetInspection",
          toJS(targetInspection),
        );
        const filledBarriersWithoutBarrierIndex =
          targetInspection.filledBarriers.filter(
            (filBar: IFilledBarrier, ind: number) => ind !== barrierIndex,
          );
        targetInspection.filledBarriers = [
          ...filledBarriersWithoutBarrierIndex,
          activeBarrier,
        ];
        targetInspection.filledFreeForms = [];
        localInspectionsParsed.splice(index, 1);
        localInspectionsParsed.unshift(targetInspection);
        const newInspectionsJson = JSON.stringify(localInspectionsParsed);
        localStorage.setItem(LOCAL_STORE_INSPECTIONS, newInspectionsJson);
      }
    }
  }

  checkIsBarrierFormSuccess(passportId?: string) {
    if (this.filledBarriers.length) {
      return this.filledBarriers.every((bar) => {
        return (
          bar[BarrierFieldTypes.Mub] &&
          bar[BarrierFieldTypes.Mub]?.trim() !== "" &&
          this.checkComment(bar) &&
          this.checkExtraFields(bar, passportId)
        );
      });
    }
    return false;
  }

  getFlatQuestionsFromBarrier(barrier?: IFilledBarrier) {
    return barrier?.filledRequirements
      ? barrier?.filledRequirements
          .map((req: IFilledRequirements) => {
            return req.filledQuestions;
          })
          .flat()
      : null;
  }

  isExtraFieldsCondition(passportId?: string) {
    return passportId === "7" || passportId === "5";
  }

  checkExtraFields(barrier: IFilledBarrier, passportId?: string) {
    if (this.isExtraFieldsCondition(passportId)) {
      const mubValuesArray = barrier?.[BarrierFieldTypes.Mub]?.split(",");
      return (
        mubValuesArray.length &&
        mubValuesArray.length === 3 &&
        mubValuesArray.every((extraVal) => extraVal && extraVal !== "")
      );
    }
    return true;
  }

  checkComment(barrier: IFilledBarrier) {
    return this.getFlatQuestionsFromBarrier(barrier)?.every(
      (q: IFilledQuestions) => {
        if (
          q[FilledQuestionTypes.FulfillmentId] === 2 &&
          q?.[FilledQuestionTypes.Comment] === ""
        ) {
          return false;
        }

        if (
          q[FilledQuestionTypes.InapplicableReasonId] === 3 &&
          q?.[FilledQuestionTypes.Comment] === ""
        ) {
          return false;
        }

        return true;
      },
    );
  }

  checkIsFilledBarriersForBarrierIdSuccess(
    barrierId: number,
    passportId?: string,
  ) {
    const filteredFilledBarriers = this.getFoundBarriersById(barrierId);
    if (filteredFilledBarriers.length) {
      return filteredFilledBarriers.every(
        (bar) =>
          bar[BarrierFieldTypes.Mub] &&
          bar[BarrierFieldTypes.Mub]?.trim() !== "" &&
          this.checkComment(bar) &&
          this.checkExtraFields(bar, passportId),
      );
    }
    return false;
  }
}
