import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { nodeEnv } from "../constants/config";

const localConfig: AxiosRequestConfig = {
  baseURL: "http://localhost:4000/",
};
const inspectionProdConfig: AxiosRequestConfig = {
  baseURL: "http://nbk01-uttdn-kb.gazprom-neft.local:9003/api/v1/",
};
const violationsConfig: AxiosRequestConfig = {
  baseURL: "http://nbk01-uttdn-kb.gazprom-neft.local:9003/api/violation-resolve/v1/",
};
console.log("nodeEnv", nodeEnv);
export const localDevInstance: AxiosInstance = axios.create(localConfig);
export const instance: AxiosInstance = axios.create(
  nodeEnv === "development" ? localConfig : inspectionProdConfig,
);

export const violationsInstance: AxiosInstance = axios.create(
  nodeEnv === "development" ? localConfig : violationsConfig,
);

export const employeesEndpoint = `employees`;
export const inspectionsEndpoint = `inspections`;
