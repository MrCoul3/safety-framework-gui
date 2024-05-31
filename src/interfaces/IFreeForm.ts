import { FreeFormTypes } from "../enums/FreeFormTypes";
import {IEntity} from "./IEntity";

export interface IFreeForm {
  [FreeFormTypes.ViolationCategories]: IEntity | null;
  [FreeFormTypes.ViolationTypes]: IEntity | null;
  [FreeFormTypes.Violations]: IEntity | null;
  [FreeFormTypes.WorkTypes]: IEntity | null;
  [FreeFormTypes.CorpDicts]: IEntity | null;
  [FreeFormTypes.Nmds]: IEntity | null;
  [FreeFormTypes.NmdRules]: IEntity | null;
  [FreeFormTypes.OdOuCategories]: IEntity | null;
  [FreeFormTypes.RiskLevels]: IEntity | null;
}
