import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { nodeEnv } from "../constants/config";

const localConfig: AxiosRequestConfig = {
  baseURL: "http://localhost:4000/",
};
const gazPromDevConfig: AxiosRequestConfig = {
  baseURL: "http://nbk01-uttdn-kb.gazprom-neft.local:9003/api/v1/",
};
console.log("nodeEnv", nodeEnv);
export const localDevInstance: AxiosInstance = axios.create(localConfig);
export const instance: AxiosInstance = axios.create(
  nodeEnv === "development" ? localConfig : gazPromDevConfig,
);

export const employeesEndpoint = `employees`;
