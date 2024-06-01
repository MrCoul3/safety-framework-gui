import {FreeFormFieldTypes, FreeFormTypes} from "../enums/FreeFormTypes";
import {IEntity} from "./IEntity";

export interface IFreeForm {
  [FreeFormFieldTypes.ViolationCategory]: IEntity | null;
  [FreeFormFieldTypes.ViolationType]: IEntity | null;
  [FreeFormFieldTypes.Violation]: IEntity | null;
  [FreeFormFieldTypes.WorkType]: IEntity | null;
  [FreeFormFieldTypes.Nmd]: IEntity | null;
  [FreeFormFieldTypes.NmdRule]: IEntity | null;
  [FreeFormFieldTypes.OdOuCategory]: IEntity | null;
  [FreeFormFieldTypes.RiskLevel]: IEntity | null;
}
