import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";


const typeService={
    findAllTypes:(page=1)=>axiosService.get(urls.types,{params:{page}}),
    saveType:(type)=>axiosService.post(`${urls.types}`,type),
    findTypeById:(typeId)=>axiosService.get(`${urls.types}/${typeId}`),
    updateType:(typeId,type)=>axiosService.put(`${urls.types}/${typeId}`,type),
    deleteTypeById:(typeId)=>axiosService.delete(`${urls.types}/${typeId}`)
}

export {
    typeService
}