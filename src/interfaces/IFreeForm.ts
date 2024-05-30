import { FreeFormTypes } from "../enums/FreeFormTypes";
import {IEntity} from "./IEntity";

export interface IFreeForm {
  [FreeFormTypes.ViolationCategories]: IEntity;
  [FreeFormTypes.ViolationTypes]: IEntity;
  [FreeFormTypes.Violations]: IEntity;
  [FreeFormTypes.WorkTypes]: IEntity;
  [FreeFormTypes.CorpDicts]: IEntity;
  [FreeFormTypes.Nmds]: IEntity;
  [FreeFormTypes.NmdRules]: IEntity;
  [FreeFormTypes.OdOuCategories]: IEntity;
  [FreeFormTypes.RiskLevels]: IEntity;
}
