import { FreeFormTypes } from "../enums/FreeFormTypes";

export interface IFreeForm {
  [FreeFormTypes.ViolationCategories]: string;
  [FreeFormTypes.ViolationTypes]: string;
  [FreeFormTypes.Violations]: string;
  [FreeFormTypes.WorkTypes]: string;
  [FreeFormTypes.CorpDicts]: string;
  [FreeFormTypes.Nmds]: string;
  [FreeFormTypes.NmdRules]: string;
  [FreeFormTypes.OdOuCategories]: string;
  [FreeFormTypes.RiskLevels]: string;
}
