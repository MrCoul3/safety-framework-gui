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

export class BarriersStore {
  private store: AppStore;

  constructor(store: AppStore) {
    this.store = store;
    makeAutoObservable(this);
  }

  filledBarriers: IFilledBarrier[] = [];
  barriers: IBarrier[] = [];
  fulfillments: IFulfillment[] = [];
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
        `Barriers?$filter=(passportId eq ${passportId})and(IsActual eq true)and(IsPk ne null)&$count=true`,
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

  setBarriers(value: IBarrier[]) {
    this.barriers = value;
    console.debug("barriers: ", toJS(this.barriers));
  }
  setFulfillments(value: IFulfillment[]) {
    this.fulfillments = value;
    console.debug("fulfillments: ", toJS(this.fulfillments));
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

  clearFilledBarrier(barrierId: number, index: number) {
    const foundBarriersById = this.getFoundBarriersById(barrierId);
    const activeBarrier = foundBarriersById[index];
    // перебираем все необходимые поля и задаем им пустые значения или по умолчанию и сохраняем
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

    filledRequirements = filledRequirements ? filledRequirements?.map((fillReq) => {
      if (newFilledQuestions && newFilledQuestions.length) {
        const fillQReqId = newFilledQuestions[0].filledRequirementId
        if (fillReq.requirementId === fillQReqId) {
          fillReq.filledQuestions = newFilledQuestions
        }
      }
      return fillReq
    }) : []
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
        const targetInspection = localInspectionsParsed[index];
        targetInspection.filledBarriers = this.filledBarriers;
        localInspectionsParsed.splice(index, 1);
        localInspectionsParsed.unshift(targetInspection);
        const newInspectionsJson = JSON.stringify(localInspectionsParsed);
        localStorage.setItem(LOCAL_STORE_INSPECTIONS, newInspectionsJson);
      }
    }
  }
}
