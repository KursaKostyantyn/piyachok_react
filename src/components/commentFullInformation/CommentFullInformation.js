import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {commentsActions} from "../../redux";

const CommentFullInformation = () => {
    const {currentComment} = useSelector(state => state.comments);
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(commentsActions.findCommentById({id:params.myCommentsId}))
    }, [dispatch])


    return (
        <div>{
            currentComment &&
            <div>
                <div>id: {currentComment.id}</div>
                <div>Назва закладу: {currentComment.place.name}</div>
                <div>Коментарій: {currentComment.text}</div>
            </div>

        }

        </div>
    );
};

export {CommentFullInformation};