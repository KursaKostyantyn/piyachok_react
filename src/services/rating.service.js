import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

const ratingService = {
    findAllRatings: () => axiosService.get(urls.ratings),
    findRatingsByUserLogin: (login) => axiosService.get(`${urls.ratings}/myRatings?login=${login}`),
    saveRating:(rating)=>axiosService.post(`${urls.ratings}`,rating),
    updateRating:(rating)=>axiosService.put(`${urls.ratings}`,rating),
    findRatingByPLaceIdAndUserLogin:(placeId,userLogin)=>axiosService.get(`${urls.ratings}/rating`,{params:{placeId,userLogin}}),
    findRatingById:(myRatingsId)=>axiosService.get(`${urls.ratings}/${myRatingsId}`),


}

export {
    ratingService
}