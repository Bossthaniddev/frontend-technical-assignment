import axios from 'axios';
import queryString from 'query-string';

import ConfigApi from './ConfigApi';

const AxiosClient = axios.create({
    baseURL: ConfigApi.baseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify({...params, api_key: ConfigApi.apiKey})
});

AxiosClient.interceptors.request.use(async (config) => config);

AxiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    throw error;
});

export default AxiosClient;