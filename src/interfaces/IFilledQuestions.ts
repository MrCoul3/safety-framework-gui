import { FilledQuestionTypes } from "../enums/FilledQuestionTypes";

export interface IFilledQuestions {
  [FilledQuestionTypes.FilledRequirementId]?: number;
  [FilledQuestionTypes.QuestionId]?: number;
  [FilledQuestionTypes.FulfillmentId]?: number | null; // да 1, нет 2, не применимо 3
  [FilledQuestionTypes.InapplicableReasonId]?: number | null; // не требуется 1, нет данных 2, другое 3
  [FilledQuestionTypes.Comment]?: string;
  [FilledQuestionTypes.WorkStopped]?: boolean | null;
  [FilledQuestionTypes.ResolvedInPlace]?: boolean | null;
  [FilledQuestionTypes.PlannedResolveDate]?: string | null | Date;
}
