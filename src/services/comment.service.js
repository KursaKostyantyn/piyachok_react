import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

const commentService={
    findCommentsByUserLogin:(login)=>axiosService.get(`${urls.myComments}?login=${login}`),
    findCommentById:(id)=>axiosService.get(`${urls.myComments}/${id}`),
    findCommentsByPlaceId:(placeId,page,old)=>axiosService.get(`${urls.comments}/placeComments`,{params:{placeId,page,old}}),
    saveComment:(comment)=>axiosService.post(`${urls.comments}`,comment),
    updateComment:(comment)=>axiosService.put(`${urls.comments}`,comment)

}

export {
    commentService
}