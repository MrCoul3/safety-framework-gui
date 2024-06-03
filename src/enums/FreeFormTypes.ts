export enum FreeFormTypes {
  ViolationCategories = "ffViolationCategories", // Категория нарушения
  ViolationTypes = "ffViolationTypes", // Типовое нарушение
  Violations = "ffViolations", // Нарушение
  WorkTypes = "ffWorkTypes", // Вид работ нарушения
  // Описание нарушения ?
  Nmds = "ffNmds", // НМД
  NmdRules = "ffNmdRules", // Пункт правил НМД
  OdOuCategories = "ffOdOuCategories", // Категория ОД/ОУ
  RiskLevels = "ffRiskLevels", // Степень риска
}

export enum FreeFormFieldTypes {
  ViolationCategory = "ffViolationCategory",
  ViolationType = "ffViolationType",
  Violation = "ffViolation",
  WorkType = "ffWorkType",
  // Описание нарушения ?
  Nmd = "ffNmd",
  NmdRule = "ffNmdRule",
  OdOuCategory = "ffOdOuCategory",
  RiskLevel = "ffRiskLevel",
}
export const FREE_FORM_COMMON_FIELDS = Object.values(FreeFormFieldTypes);
export const FREE_FORM_NOT_REQUIRED_FIELDS = [""];
export const FREE_FORM_REQUIRED_FIELDS = FREE_FORM_COMMON_FIELDS.filter(
  (field) => !FREE_FORM_NOT_REQUIRED_FIELDS.includes(field),
);

export const freeFormDictNames = {
  [FreeFormFieldTypes.ViolationCategory]: FreeFormTypes.ViolationCategories,
  [FreeFormFieldTypes.ViolationType]: FreeFormTypes.ViolationTypes,
  [FreeFormFieldTypes.Violation]: FreeFormTypes.Violations,
  [FreeFormFieldTypes.WorkType]: FreeFormTypes.WorkTypes,
  [FreeFormFieldTypes.Nmd]: FreeFormTypes.Nmds,
  [FreeFormFieldTypes.NmdRule]: FreeFormTypes.NmdRules,
  [FreeFormFieldTypes.OdOuCategory]: FreeFormTypes.OdOuCategories,
  [FreeFormFieldTypes.RiskLevel]: FreeFormTypes.RiskLevels,
}
