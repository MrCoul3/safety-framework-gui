export enum FreeFormTypes {
  ViolationCategories = "ffViolationCategories", // Категория нарушения
  ViolationTypes = "ffViolationTypes", // Типовое нарушение
  Violations = "ffViolations", // Нарушение
  WorkTypes = "ffWorkTypes", // Вид работ нарушения
  Nmds = "ffNmds", // НМД
  NmdRules = "ffNmdRules", // Пункт правил НМД
  OdOuCategories = "ffOdOuCategories", // Категория ОД/ОУ
  RiskLevels = "ffRiskLevels", // Степень риска
}

export enum FreeFormFieldTypes {
  ViolationCategory = "ffViolationCategory",
  ViolationType = "ffViolationType",
  Violation = "ffViolation",
  ViolationManual = "ffViolationManual", // Описание пользовательское
  WorkType = "ffWorkType",
  Nmd = "ffNmd",
  NmdRule = "ffNmdRule",
  OdOuCategory = "ffOdOuCategory",
  RiskLevel = "ffRiskLevel",
}
export const FREE_FORM_COMMON_FIELDS = Object.values(FreeFormFieldTypes);
export const FREE_FORM_NOT_REQUIRED_FIELDS = [""];
export const OTHER_COND_FREE_FORM_NOT_REQUIRED_FIELDS = [FreeFormFieldTypes.Violation];
export const NOT_OTHER_COND_FREE_FORM_NOT_REQUIRED_FIELDS = [FreeFormFieldTypes.ViolationManual];
export const FREE_FORM_REQUIRED_FIELDS = FREE_FORM_COMMON_FIELDS.filter(
  (field) => !FREE_FORM_NOT_REQUIRED_FIELDS.includes(field),
);
export const OTHER_COND_FREE_FORM_REQUIRED_FIELDS = FREE_FORM_COMMON_FIELDS.filter(
  (field) => !OTHER_COND_FREE_FORM_NOT_REQUIRED_FIELDS.includes(field),
);
export const NOT_OTHER_COND_FREE_FORM_REQUIRED_FIELDS = FREE_FORM_COMMON_FIELDS.filter(
  (field) => !NOT_OTHER_COND_FREE_FORM_NOT_REQUIRED_FIELDS.includes(field),
);

export const freeFormDictNames = {
  [FreeFormFieldTypes.ViolationCategory]: FreeFormTypes.ViolationCategories,
  [FreeFormFieldTypes.ViolationType]: FreeFormTypes.ViolationTypes,
  [FreeFormFieldTypes.Violation]: FreeFormTypes.Violations,
  [FreeFormFieldTypes.ViolationManual]: null,

  [FreeFormFieldTypes.WorkType]: FreeFormTypes.WorkTypes,
  [FreeFormFieldTypes.Nmd]: FreeFormTypes.Nmds,
  [FreeFormFieldTypes.NmdRule]: FreeFormTypes.NmdRules,
  [FreeFormFieldTypes.OdOuCategory]: FreeFormTypes.OdOuCategories,
  [FreeFormFieldTypes.RiskLevel]: FreeFormTypes.RiskLevels,
}
