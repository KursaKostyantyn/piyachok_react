import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

const typeService={
    findAllTypes:()=>axiosService.get(urls.types),
    saveType:(type)=>axiosService.post(`${urls.types}`,type)
}

export {
    typeService
}