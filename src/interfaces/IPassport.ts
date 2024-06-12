import {IBarrier} from "./IBarrier";

export interface IPassport {
  code: string;
  dateCreated: string;
  dateModified: string;
  id: string;
  isActual: boolean;
  sortOrder: null;
  title: string;

  barriers: IBarrier[],
  uniqueId: string;
  icon: null | string
}
