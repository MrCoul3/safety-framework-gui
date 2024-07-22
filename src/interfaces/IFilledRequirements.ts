import { IFilledQuestions } from "./IFilledQuestions";

export interface IFilledRequirements {
  requirementId: number;
  id?: number;
  filledQuestions: IFilledQuestions[];
}
