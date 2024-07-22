import { IRequirement } from "./IRequirement";

export interface IBarrier {
  mub: string | null;
  mubHint: string | null;
  passportId: number;
  requiredFrequencyOfChecksInDays: number;
  sortOrder: number;
  mubTypeId: number,
  isPk: null | boolean;
  countOfCsir: null | number;
  targetPercent: null | number;
  intenseTargetPercent: null | number;
  title: string | null;
  uniqueId: string;
  isActual: boolean | null;
  dateCreated: Date;
  dateModified: Date;
  id: number;
  requirements: IRequirement[];
}
