export enum FreeFormTypes {
  ViolationCategories = "ffViolationCategories", // Категория нарушения
  ViolationTypes = "ffViolationTypes", // Типовое нарушение
  Violations = "ffViolations", // Нарушение
  WorkTypes = "ffWorkTypes", // Вид работ нарушения
  CorpDicts = "ffCorpDicts", // ?

  // Описание нарушения ?
  Nmds = "ffNmds", // НМД
  NmdRules = "ffNmdRules", // Пункт правил НМД
  OdOuCategories = "ffOdOuCategories", // Категория ОД/ОУ
  RiskLevels = "ffRiskLevels", // Степень риска
}
export const FREE_FORM_COMMON_FIELDS = Object.values(FreeFormTypes);
export const FREE_FORM_NOT_REQUIRED_FIELDS = [""];
export const FREE_FORM_REQUIRED_FIELDS = FREE_FORM_COMMON_FIELDS.filter(
  (field) => !FREE_FORM_NOT_REQUIRED_FIELDS.includes(field),
);
