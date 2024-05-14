import { CheckEntityTypes } from "../enums/CheckEntityTypes";
import { InspectionFormTypes } from "../enums/InspectionFormTypes";

export interface IInspection {
  id: string;
  [InspectionFormTypes.InspectionType]: string;
  [InspectionFormTypes.OilField]: string;
  [InspectionFormTypes.DoStructs]: string;
  [InspectionFormTypes.AuditDate]: number;
  [InspectionFormTypes.InspectionForm]: CheckEntityTypes;
}
