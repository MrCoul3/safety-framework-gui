import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
    baseURL: 'http://localhost:4000/',
};
const gazPromDevConfig: AxiosRequestConfig = {
    baseURL: 'http://nbk01-uttdn-kb.gazprom-neft.local:9003/api/v1/',
};

export const localDevInstance: AxiosInstance = axios.create(config);
export const instance: AxiosInstance = axios.create(gazPromDevConfig);