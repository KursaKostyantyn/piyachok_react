import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

const ratingService = {
    findAllRatings: () => axiosService.get(urls.myRatings),
    findRatingsByUserLogin: (login) => axiosService.get(`${urls.myRatings}?login=${login}`),


}

export {
    ratingService
}