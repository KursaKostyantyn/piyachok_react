import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

const favoritePlacesService={
    getFavoritePlacesByUserId:(id)=>axiosService.get(`${urls.favoritePlaces}?userId=${id}`)

}

export {
    favoritePlacesService
}