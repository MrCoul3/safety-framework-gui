export interface IPassport {
  code: string;
  sortOrder: null;
  title: string;
  uniqueId: string;
  isActual: boolean;
  dateCreated: string;
  dateModified: string;
  id: number;
  barriers: string[],
  icon: null | string
}
