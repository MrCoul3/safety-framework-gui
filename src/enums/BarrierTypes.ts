export enum BarrierFieldTypes {
  Mub = "mub",
}

export enum BarrierExtraFieldTypes {
  "VehicleType" = "vehicleType",
  "LicencePlate" = "licencePlate",
  "DriverFio" = "driverFio",
}

export const BARRIER_EXTRA_FIELDS_VALUES = Object.values(
  BarrierExtraFieldTypes,
);
