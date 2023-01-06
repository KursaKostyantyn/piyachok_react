import axios from "axios";

import {baseURL} from "../constants/urls";
import {authService} from "./auth.service";
import {createBrowserHistory} from 'history';


const history = createBrowserHistory();

const axiosService = axios.create({baseURL});

axiosService.interceptors.request.use((config) => {
    const access = authService.getAccessToken();

    if (access) {
        config.headers.Authorization = `Bearer ${access}`
    }
    return config
})
let isRefreshing = false
axiosService.interceptors.response.use((config) => {
        return config
    },
    async (error) => {
        const refreshToken = authService.getRefreshToken();
        authService.deleteAccessToken();
        if (error.response?.status === 401 && error.config && !isRefreshing && refreshToken) {
            isRefreshing = true
            try {
                const {data} = await authService.refresh({token:refreshToken});
                authService.setTokens(data)
            } catch (e) {
                authService.deleteTokens();
                return history.replace('/login?ExpiredToken=true')
            }
            isRefreshing = false;
            return axiosService(error.config);
        }
        return Promise.reject(error)
    }
)

export {
    axiosService,
    history
}