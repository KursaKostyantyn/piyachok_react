import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

const newsService = {
    findAllNews: (old, page) => axiosService.get(`${urls.news}/allNews`, {params: {old, page}}),
    findNewsById: (id) => axiosService.get(`${urls.news}/${id}`),
    findMainNews: (old, page) => axiosService.get(`${urls.news}/mainNews`, {params: {old, page}}),
    findNewsByUserId: (old, page, userId) => axiosService.get(`${urls.news}`, {params: {old, page, userId}}),
    deleteNewsById:(id)=>axiosService.delete(`${urls.news}/${id}`),
    updateNewsById:(id,news)=>axiosService.put(`${urls.news}/${id}`,news),
    saveNews:(news, placeId,login)=>axiosService.post(`${urls.news}`,news,{params:{placeId,login}})

}

export {
    newsService
}