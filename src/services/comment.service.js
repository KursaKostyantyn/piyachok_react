import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

const commentService={
    findCommentsByUserLogin:(login)=>axiosService.get(`${urls.myComments}?login=${login}`)
}

export {
    commentService
}