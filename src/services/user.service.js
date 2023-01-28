import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

const userService = {
    findAllUsers: () => axiosService.get(urls.users),
    deleteUserById: (id) => axiosService.delete(`${urls.users}/${id}`),
    findUserById: (id) => axiosService.get(`${urls.users}/${id}`),
    updateUserById: (id, user) => axiosService.put(`${urls.users}/update?id=${id}`, user),



}

export {
    userService
}