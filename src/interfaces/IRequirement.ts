import {IQuestion} from "./IQuestion";

export interface IRequirement {
  barrierId: number;
  dateCreated: string;
  dateModified: string;
  id: number;
  isActual: boolean;
  questions: IQuestion[];
  sortOrder: number;
  title: string;
  uniqueId: string;
}
