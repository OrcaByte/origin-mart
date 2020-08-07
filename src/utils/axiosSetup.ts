import axios, { AxiosRequestConfig } from 'axios';
import { getPersistStorageValue } from './index'

function getSessionId() {
    if (getPersistStorageValue('sessionId')) {
        return {
            sessionId: `${getPersistStorageValue('sessionId')}`
        }
    }
    return {}
}

const axiosRequestConfiguration: AxiosRequestConfig = {
    baseURL: 'http://localhost:4321/',
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        "X-Requested-With": "XMLHttpRequest",
    },
};


export const axiosInstance = axios.create(axiosRequestConfiguration);
export const refreshHeader = () => {
    axiosInstance.defaults.headers.common['sessionId'] = getPersistStorageValue(
        'sessionId'
    );
}


