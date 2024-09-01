// common/api/api.service.ts

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IApiResponse } from '../interfaces/interface.common';

class ApiService {
    private static axiosInstance = axios.create({
        baseURL: `http://103.28.121.117:7010`,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    protected static async getAll<IData>(url: string, config?: AxiosRequestConfig): Promise<IApiResponse<IData[]>> {
        try {
            const response: AxiosResponse<IApiResponse<IData[]>> = await ApiService.axiosInstance.get(url, config);
            return response.data;
        } catch (error) {
            ApiService.handleError(error);
            throw error;
        }
    }

    // Static GET method
    protected static async getOne<IData>(url: string, config?: AxiosRequestConfig): Promise<IApiResponse<IData>> {
        try {
            const response: AxiosResponse<IApiResponse<IData>> = await ApiService.axiosInstance.get(url, config);
            return response.data;
        } catch (error) {
            ApiService.handleError(error);
            throw error;
        }
    }

    // Static POST method
    protected static async post<IData>(url: string, data: any, config?: AxiosRequestConfig): Promise<IData> {
        try {
            const response: AxiosResponse<IData> = await ApiService.axiosInstance.post(url, data, config);
            return response.data;
        } catch (error) {
            ApiService.handleError(error);
            throw error;
        }
    }

    // Static PUT method
    protected static async put<IData>(url: string, data: any, config?: AxiosRequestConfig): Promise<IData> {
        try {
            const response: AxiosResponse<IData> = await ApiService.axiosInstance.put(url, data, config);
            return response.data;
        } catch (error) {
            ApiService.handleError(error);
            throw error;
        }
    }

    // Static DELETE method
    protected static async delete<IData>(url: string, config?: AxiosRequestConfig): Promise<IData> {
        try {
            const response: AxiosResponse<IData> = await ApiService.axiosInstance.delete(url, config);
            return response.data;
        } catch (error) {
            ApiService.handleError(error);
            throw error;
        }
    }

    // Static error handling method
    private static handleError(error: any): void {
        // Handle the error (e.g., log it, display a message to the user, etc.)
        console.error('API Error:', error.response ? error.response.data : error.message);
    }
}

export default ApiService;
