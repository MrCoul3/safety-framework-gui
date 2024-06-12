import { FilledQuestionTypes } from "../enums/FilledQuestionTypes";

export interface IFilledQuestions {
  [FilledQuestionTypes.FilledRequirementId]?: number;
  [FilledQuestionTypes.QuestionId]?: number;
  [FilledQuestionTypes.FulfillmentId]?: number; // да 1, нет 2, не применимо 3
  [FilledQuestionTypes.InapplicableReasonId]?: number; // не требуется 1, нет данных 2, другое 3
  [FilledQuestionTypes.Comment]?: string;
  [FilledQuestionTypes.WorkStopped]?: boolean;
  [FilledQuestionTypes.ResolvedInPlace]?: boolean;
  [FilledQuestionTypes.PlannedResolveDate]?: string | null | Date;
}
