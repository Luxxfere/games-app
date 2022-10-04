import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface PostArgs<T> {
    url: string;
    data: T
}


class Api {
    private static axiosInstance: AxiosInstance;

    static init() {
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:8080'
        })
    }

    static async get<ResponseType>(url: string) {
        return await Api.axiosInstance.get<ResponseType>(url)
    }

    static async post<ResponseType, DataType = undefined>({url, data}:PostArgs<DataType>){
        return this.axiosInstance.post<DataType, AxiosResponse<ResponseType>>(url, data)
    }

    static async patch<ResponseType, DataType = undefined>({url, data}:PostArgs<DataType>){
        return this.axiosInstance.patch<DataType, AxiosResponse<ResponseType>>(url, data)
    }

    static async delete<ResponseType>(url: string){
        return await this.axiosInstance.delete<unknown, AxiosResponse<ResponseType>>(url)
    }
}

export default Api;