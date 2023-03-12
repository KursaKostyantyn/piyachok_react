import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

const placeService = {
    findAllPlaces: (page = 1, alphabet, old, rating, averageCheck) => axiosService.get(urls.places, {
        params: {
            page,
            alphabet,
            old,
            rating,
            averageCheck
        }
    }),
    findAllActivatedPlaces: (page = 1, alphabet, old, rating, averageCheck) => axiosService.get(`${urls.places}/activated`, {
        params: {
            page,
            alphabet,
            old,
            rating,
            averageCheck
        }
    }),
    savePlace: (place, userId) => axiosService.post(`${urls.places}?userId=${userId}`, place),
    deletePlaceById: (id) => axiosService.delete(`${urls.places}/${id}`),
    findPlaceById: (id) => axiosService.get(`${urls.places}/${id}`),
    updatePlaceById: (placeId, place) => axiosService.put(`${urls.places}/${placeId}`, place),
    findPlaceByUserLogin: (userLogin, page = 1) => axiosService.get(`${urls.places}/myPlaces`, {
        params: {
            userLogin,
            page
        }
    }),
    addPhotosToPlaceById: (formData) => axiosService.put(`${urls.places}/addPhotos`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }),
    findPLaceByName: (placeName, page) => axiosService.get(`${urls.places}/search/findPLaceByName`, {
        params: {
            placeName,
            page
        }
    })

}

export {
    placeService
}