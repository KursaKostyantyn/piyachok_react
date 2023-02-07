import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

const commentService = {
    findCommentsByUserLogin: (login, page = 1, old = false) => axiosService.get(`${urls.myComments}?login=${login}`, {
        params: {
            page,
            old
        }
    }),
    findCommentById: (commentId) => axiosService.get(`${urls.comments}/${commentId}`),
    findCommentsByPlaceId: (placeId, page, old) => axiosService.get(`${urls.comments}/placeComments`, {
        params: {
            placeId,
            page,
            old
        }
    }),
    saveComment: (comment) => axiosService.post(`${urls.comments}`, comment),
    updateComment: (comment) => axiosService.put(`${urls.comments}`, comment),
    findAllComments: (page = 1, old = false) => axiosService.get(`${urls.comments}`, {params: {page, old}})

}

export {
    commentService
}