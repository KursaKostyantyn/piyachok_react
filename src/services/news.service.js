import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

const newsService={
    findAllNews:()=>axiosService.get(`${urls.allNews}`),
    findNewsById:(id)=>axiosService.get(`${urls.news}/${id}`),
    findMainNews:()=>axiosService.get(`${urls.mainNews}`)
}

export {
    newsService
}