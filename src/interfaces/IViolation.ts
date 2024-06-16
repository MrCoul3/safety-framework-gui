import {IEntity} from "./IEntity";

export interface IViolation {
  auditDate: string;

  date: [Date?, Date?]
  auditee: string;
  auditor: string;
  comment: string;
  contractor: IEntity;
  doObject: IEntity;
  doStruct: IEntity;
  filledBarrierUid: string;
  id: number;
  isResolved?: boolean;
  oilfield: IEntity;
  passport: IEntity;
  question: string;
  resolveComment: string;
  resolveFilename: string;
  resolveFilepath: string;
  resolvedBy: string;
  resolvedOn: string;
}
