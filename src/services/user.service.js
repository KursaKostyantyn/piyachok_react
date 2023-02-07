import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

const userService = {
    findAllUsers: (page=1) => axiosService.get(urls.users,{params:{page}}),
    deleteUserById: (id) => axiosService.delete(`${urls.users}/${id}`),
    findUserById: (userId) => axiosService.get(`${urls.users}/${userId}`),
    updateUserById: (id, user) => axiosService.put(`${urls.users}/update?id=${id}`, user),
    getFavoritePlacesByUserLogin: (login) => axiosService.get(`${urls.users}/favoritePlaces?login=${login}`),
    checkPlaceIsFavoriteByPlaceIdAndUserLogin: (placeId, login) => axiosService.get(`${urls.users}/favoritePlaces/check?placeId=${placeId}&login=${login}`),
    addPlaceToFavoriteByPlaceIdAndUserLogin: (placeId, login) => axiosService.put(`${urls.users}/favoritePlaces/add?placeId=${placeId}&login=${login}`),
    deletePlaceFromFavoriteByPlaceIdUserLogin: (placeId, login) => axiosService.delete(`${urls.users}/favoritePlaces/delete?placeId=${placeId}&login=${login}`),
    activateUser: (activateToken) => axiosService.get(`${urls.activate}`, {params: {activateToken}}),
    sendResetPasswordToken: (userLogin) => axiosService.get(`${urls.users}/sendResetPasswordToken`, {params: {userLogin}}),
    resetPasswordAndSetNew:(userLogin,resetPasswordToken,password)=>axiosService.get(`${urls.users}/resetPassword`,{params:{userLogin,resetPasswordToken,password}})

}

export {
    userService
}