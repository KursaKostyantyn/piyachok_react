import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

const userService = {
    findAllUsers: () => axiosService.get(urls.users),
    deleteUserById: (id) => axiosService.delete(`${urls.users}/${id}`),
    findUserById: (id) => axiosService.get(`${urls.users}/${id}`),
    updateUserById: (id, user) => axiosService.put(`${urls.users}/update?id=${id}`, user),
    getFavoritePlacesByUserLogin: (login) => axiosService.get(`${urls.users}/favoritePlaces?login=${login}`),
    checkPlaceIsFavoriteByPlaceIdAndUserLogin: (placeId, login) => axiosService.get(`${urls.users}/favoritePlaces/check?placeId=${placeId}&login=${login}`),
    addPlaceToFavoriteByPlaceIdAndUserLogin: (placeId, login) => axiosService.put(`${urls.users}/favoritePlaces/add?placeId=${placeId}&login=${login}`),
    deletePlaceFromFavoriteByPlaceIdUserLogin: (placeId, login) => axiosService.delete(`${urls.users}/favoritePlaces/delete?placeId=${placeId}&login=${login}`),
    activateUserById: (userId) => axiosService.get(`${urls.activate}`, {params: {userId}})


}

export {
    userService
}