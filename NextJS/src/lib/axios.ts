import axios, { AxiosError } from 'axios';


export const axiosGetter = async <T>(url: string): Promise<T> => {
    try {
        const res = await axios.get(url);
        return res.data as T;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError;
    }
}

// throw axios error type if get request fails 
export const axiosPoster = async <T>(url: string, data: any): Promise<T> => {
    try {
        const res = await axios.post(url, data);
        return res.data as T;
    } catch (error) {
        throw error;
    }
}