import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

const favoritePlacesService={
    getFavoritePlacesByUserLogin:(login)=>axiosService.get(`${urls.favoritePlaces}?login=${login}`),
    addPlaceToFavoriteByPlaceIdAndUserLogin:(placeId,login)=>axiosService.post(`${urls.favoritePlaces}`,null,{params:{placeId,login}})

}

export {
    favoritePlacesService
}