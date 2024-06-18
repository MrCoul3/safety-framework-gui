import {IEntity} from "./IEntity";

export interface IViolation {
  auditDate: Date;

  date: [Date?, Date?]
  auditee: string;
  auditor: string;
  inspectionType: string;
  comment: string;
  contractor: string;
  doObject: string;
  doStruct: string;
  filledBarrierUid: string;
  id: number;
  isResolved: boolean;
  oilfield: string;
  passport: string;
  question: string;
  resolveComment: string;
  resolveFilename: string;
  resolveFilepath: string;
  resolvedBy: string;
  resolvedOn: string;
}
