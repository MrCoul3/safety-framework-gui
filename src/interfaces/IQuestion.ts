export interface IQuestion {
  dateCreated: string;
  dateModified: string;
  id: number;
  isActual: boolean;
  isStoppingPoint: boolean;
  requirementId: number;
  sortOrder: number;
  title: string;
  uniqueId: string;
}
