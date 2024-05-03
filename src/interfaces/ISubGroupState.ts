import { SubGroupsTypes } from "../enums/SubGroupsTypes";
import { IAction } from "./IAction";

export interface ISubGroupState {
  name: SubGroupsTypes;
  actions: IAction[];
}
