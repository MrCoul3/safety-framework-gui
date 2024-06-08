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
   /* const foundBarriersById = this.getFoundBarriersById(barrierId);
    const activeBarrier = foundBarriersById[index];
    const filledRequirements = activeBarrier?.filledRequirements;
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
    });*/
    /*this.filledBarriers = this.filledBarriers.map((fillBar) => {
      console.log('updateFilledQuestions fillBar.barrierId', toJS(fillBar.barrierId))
      console.log('updateFilledQuestions barrierId', toJS(barrierId))

      if (fillBar.barrierId === barrierId) {
        console.log('updateFilledQuestions fillBar', toJS(fillBar))
        return  fillBar?.filledRequirements?.map(
          (fillReq: IFilledRequirements) => {
            if (
              fillReq.requirementId ===
              value[FilledQuestionTypes.FilledRequirementId]
            ) {
              fillReq.filledQuestions.map((fillQ) => {
                if (
                  fillQ[FilledQuestionTypes.QuestionId] ===
                  value[FilledQuestionTypes.QuestionId]
                ) {
                  return value;
                }
                return fillQ;
              });
            }

          },
        )
      }
      return  fillBar
    });*/
    const a = this.filledBarriers[0].filledRequirements?.map(
        (fillReq: IFilledRequirements) => {
          if (
              fillReq.requirementId ===
              value[FilledQuestionTypes.FilledRequirementId]
          ) {
            fillReq.filledQuestions.map((fillQ) => {
              if (
                  fillQ[FilledQuestionTypes.QuestionId] ===
                  value[FilledQuestionTypes.QuestionId]
              ) {
                return value;
              }
              return fillQ;
            });
          }

        },
    )

    console.log(
      "updateFilledQuestions a",
      toJS(a),
    );
    console.log(
      "updateFilledQuestions this.filledBarriers",
      toJS(this.filledBarriers),
    );


    /*let barriers = [
      {
        barrierId: 1,
        filledRequirements: [
          {
            requirementId: 11,
            filledQuestion: [
              {
                filledRequirementId: 11,
                fulfillmentId: 1,
                questionId: 1,
              },
            ],
          },
          {
            requirementId: 33,
            filledQuestion: [
              {
                filledRequirementId: 33,
                fulfillmentId: 1,
                questionId: 3,
              },
            ],
          },
        ],
      },
      {
        barrierId: 2,
        filledRequirements: [
          {
            requirementId: 22,
            filledQuestion: [
              {
                filledRequirementId: 22,
                fulfillmentId: 1,
                questionId: 2,
              },
            ],
          },
        ],
      },
    ];

    const val = { value: { fulfillmentId: 2, filledRequirementId: 11,  questionId: 1}, barrierId: 1, index: 0 };

    barriers =  barriers.map((bar) => {
      if (bar.barrierId === val.barrierId) {
        const filledRequirements = bar.filledRequirements
        return  filledRequirements.map((filReq) => {
          if (filReq.requirementId === val.value.filledRequirementId) {
            const filledQuestion = filReq.filledQuestion;
            return  filledQuestion.map((filQ) => {
              console.log('filQ!! filQ.questionId', filQ.questionId)
              console.log('filQ!! val.value.questionId', val.value.questionId)
              if (filQ.questionId === val.value.questionId) {
                console.log('filQ!! val.value', val.value)
                return val.value
              }
              return filQ
            })
          }
        }) as
      }
      return  bar
    })

    console.log('test barriers', barriers);*/

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
