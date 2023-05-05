import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

const topService = {
    findAllTops: (page = 1) => axiosService.get(urls.tops, {params: {page}}),
    deleteTopById: (topId) => axiosService.delete(`${urls.tops}/${topId}`),
    saveTop: (top) => axiosService.post(urls.tops, top),
    updateTopById: (topId, top) => axiosService.put(`${urls.tops}/${topId}`, top),
    findTopsByPlaceId:(placeId)=>axiosService.get(`${urls.tops}/byPlace/${placeId}`)
}

export {
    topService
}