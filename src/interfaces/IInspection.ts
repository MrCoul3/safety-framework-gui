import { InspectionFormTypes } from "../enums/InspectionFormTypes";
import { IEntity } from "./IEntity";
import { IFreeForm } from "./IFreeForm";
import {IFilledBarrier} from "./IFilledBarrier";

export interface IInspection {
  id?: string;

  [InspectionFormTypes.AuditDate]?: Date;
  [InspectionFormTypes.InspectionForm]?: IEntity;
  [InspectionFormTypes.InspectionType]?: IEntity;
  [InspectionFormTypes.Function]?: IEntity;

  [InspectionFormTypes.OilField]?: IEntity;
  [InspectionFormTypes.DoStruct]?: IEntity;
  [InspectionFormTypes.DoObject]?: IEntity;

  [InspectionFormTypes.Contractor]?: IEntity;
  [InspectionFormTypes.ContractorStruct]?: IEntity;
  [InspectionFormTypes.SubContractor]?: IEntity;

  [InspectionFormTypes.Auditor]?: IEmployees;
  [InspectionFormTypes.Auditee]?: IEmployees;
  [InspectionFormTypes.Supervisor]?: IEmployees;
  filledFreeForms: IFreeForm[];
  filledBarriers: IFilledBarrier[];
}

export interface IEmployees {
  personFio: string;
  companyId: string;
  department: null | string;
  position: string;
  verified: boolean;
  uniqueId: string;
  isActual: boolean;
  propuskId: null | string;
  dateCreated: Date;
  dateModified: Date;
  id: string;
}
