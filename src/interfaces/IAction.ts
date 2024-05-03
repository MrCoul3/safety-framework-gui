import { IconComponent } from "@consta/icons/Icon";
import {SubGroupsActionsTypes} from "enums/SubGroupsTypes";

export interface IAction {
  label: SubGroupsActionsTypes;
  active?: boolean;
  icon: IconComponent;
}
