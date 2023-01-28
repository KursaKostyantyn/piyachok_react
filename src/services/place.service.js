import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

const placeService={
    findAllPlaces:(page=1)=>axiosService.get(urls.places,{params: {page}}),
    savePlace:(place,userId)=>axiosService.post(`${urls.places}?userId=${userId}`,place),
    deletePlaceById:(id)=>axiosService.delete(`${urls.places}/${id}`),
    findPlaceById:(id)=>axiosService.get(`${urls.places}/${id}`),
    updatePlaceById:(id,place)=>axiosService.put(`${urls.places}/${id}`,place)
}

export {
    placeService
}