import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

const piyachokService={
    findAllPyachoks:(page=1,old=false)=>axiosService.get(urls.piyachoks,{params:{page,old}}),
    savePiyachok:(piyachok)=>axiosService.post(urls.piyachoks,piyachok),
    deletePiyachokById:(piyachokId)=>axiosService.delete(`${urls.piyachoks}/${piyachokId}`),
    findPiyachokById:(piyachokId)=>axiosService.get(`${urls.piyachoks}/${piyachokId}`),
    findPiyachokByPlaceId:(placeId,page=1,old=false)=>axiosService.get(`${urls.piyachoks}/places/${placeId}`,{params:{page,old}})

}

export {
    piyachokService
}