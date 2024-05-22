import { CheckEntityTypes } from "../enums/CheckEntityTypes";
import { InspectionFormTypes } from "../enums/InspectionFormTypes";

export interface IInspection {
  id: string;

  [InspectionFormTypes.AuditDate]: Date;
  [InspectionFormTypes.InspectionForm]: CheckEntityTypes;
  [InspectionFormTypes.InspectionType]: IEntity;
  [InspectionFormTypes.Function]: IEntity;

  [InspectionFormTypes.OilField]: IEntity;
  [InspectionFormTypes.DoStruct]: IEntity;
  [InspectionFormTypes.DoObject]: IEntity;


  [InspectionFormTypes.Contractor]: IEntity;
  [InspectionFormTypes.ContractorStruct]: IEntity;
  [InspectionFormTypes.SubContractor]: IEntity;

  [InspectionFormTypes.Auditor]: IEntity;
  [InspectionFormTypes.Auditee]: IEntity;
  [InspectionFormTypes.Supervisor]: IEntity;
}


export interface IEntity {
  "title": string,
  "uniqueId": string,
  "isActual": boolean,
  "dateCreated": Date,
  "dateModified": Date,
  "id": number
}