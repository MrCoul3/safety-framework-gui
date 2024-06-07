import {IFilledRequirements} from "./IFilledRequirements";
import {BarrierFieldTypes} from "../enums/BarrierTypes";

export interface IFilledBarrier {
  [key:string]: any

  [BarrierFieldTypes.Mub]: string;
  barrierId: number;
  title?: string;
  passportId: number;
  isActive?: boolean;
  filledRequirements: IFilledRequirements[] | null;

}