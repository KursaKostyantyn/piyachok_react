import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

const placeService={
    findAllPlaces:()=>axiosService.get(urls.places),
    savePlace:(place)=>axiosService.post(urls.places,place),
    deletePlaceById:(id)=>axiosService.delete(`${urls.places}/${id}`),
    findPlaceById:(id)=>axiosService.get(`${urls.places}/${id}`),
    updatePlaceById:(id,place)=>axiosService.put(`${urls.places}/${id}`,place)
}

export {
    placeService
}