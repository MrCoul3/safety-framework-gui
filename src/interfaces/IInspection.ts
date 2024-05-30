import { CheckEntityTypes } from "../enums/CheckEntityTypes";
import { InspectionFormTypes } from "../enums/InspectionFormTypes";
import {FreeFormTypes} from "../enums/FreeFormTypes";

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

  freeForm: {

  }
}


export interface IEntity {
  "title": string,
  "uniqueId": string,
  "isActual": boolean,
  "dateCreated": Date,
  "dateModified": Date,
  "id": number
}

export interface IEmployees {
  "personFio": string,
  "companyId": string,
  "department": null | string,
  "position": string,
  "verified": boolean,
  "uniqueId": string,
  "isActual": boolean,
  "propuskId": null | string,
  "dateCreated": Date,
  "dateModified": Date,
  "id": string
}