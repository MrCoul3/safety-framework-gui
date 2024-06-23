import {IEntity} from "./IEntity";

export interface IViolation {
  auditDate: Date;

  date: [Date?, Date?]
  auditee: string | null;
  auditor: string | null;
  inspectionType: string | null;
  comment: string | null;
  contractor: string | null;
  doObject: string | null;
  doStruct: string | null;
  filledBarrierUid: string;
  id: number;
  isResolved: boolean;
  oilfield: string | null;
  passport: string | null;
  question: string | null;
  resolveComment: string | null;
  resolveFilename: string | null;
  resolveFilepath: string | null;
  resolvedBy: string | null;
  resolvedOn: string | null;
  resolveFileUrl: string | null;
}
