import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

const _accessTokenKey = "access"
const _refreshTokenKey = "refresh"


const authService = {
    login: (user) => axiosService.post(urls.login, user),
    register: (user) => axiosService.post(urls.register, user),
    refresh:(refresh)=>axiosService.post(`${urls.refresh}`,refresh),
    deleteAccessToken:()=>{
        localStorage.removeItem(_accessTokenKey);
    },

    setTokens: ({accessToken, refreshToken}) => {
        localStorage.setItem(_accessTokenKey, accessToken);
        localStorage.setItem(_refreshTokenKey, refreshToken);
    },

    deleteTokens: () => {
        localStorage.removeItem(_accessTokenKey);
        localStorage.removeItem(_refreshTokenKey);
    },

    getAccessToken: () => localStorage.getItem(_accessTokenKey),
    getRefreshToken: () => localStorage.getItem(_refreshTokenKey)


}

export {
    authService
}