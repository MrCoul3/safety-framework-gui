import { CheckEntityTypes } from "../enums/CheckEntityTypes";
import { InspectionFormTypes } from "../enums/InspectionFormTypes";
import {IEmployees, IEntity} from "./IInspection";

export interface IInspectionFilters {

  id?: string;

  [InspectionFormTypes.AuditDate]?: [Date, Date];
  [InspectionFormTypes.InspectionForm]?: IEntity[];
  [InspectionFormTypes.InspectionType]?: IEntity[];
  [InspectionFormTypes.Function]?: IEntity[];

  [InspectionFormTypes.OilField]?: IEntity[];
  [InspectionFormTypes.DoStruct]?: IEntity[];
  [InspectionFormTypes.DoObject]?: IEntity[];


  [InspectionFormTypes.Contractor]?: IEntity[];
  [InspectionFormTypes.ContractorStruct]?: IEntity[];
  [InspectionFormTypes.SubContractor]?: IEntity[];

  [InspectionFormTypes.Auditor]?: IEmployees[];
  [InspectionFormTypes.Auditee]?: IEmployees[];
  [InspectionFormTypes.Supervisor]?: IEmployees[];

}

