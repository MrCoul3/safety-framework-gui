import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
    baseURL: 'http://localhost:4000/',
};

export const instance: AxiosInstance = axios.create(config);