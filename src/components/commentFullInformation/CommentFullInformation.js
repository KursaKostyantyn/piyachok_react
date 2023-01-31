import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import {commentsActions} from "../../redux";

const CommentFullInformation = () => {
    const {currentComment} = useSelector(state => state.comments);
    const dispatch = useDispatch();
    const params = useParams();
    const location = useLocation();
    const [canEdit,setCanEdit] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if (location.pathname.includes('myComments')){
            setCanEdit(true)
        } else {
            setCanEdit(false)
        }
    },[])

    useEffect(() => {
        dispatch(commentsActions.findCommentById({id:params.myCommentsId}))
    }, [dispatch])

    const updateComment=()=>{
        navigate('updateComment')
    }


    return (
        <div>{
            currentComment &&
            <div>
                <div>id: {currentComment.id}</div>
                <div>Ім'я користувача: {currentComment.userLogin}</div>
                <div>Назва закладу: {currentComment.placeName}</div>
                <div>Коментарій: {currentComment.text}</div>
                {canEdit && <button onClick={updateComment}>Редагувати коментарій</button>}

            </div>

        }

        </div>
    );
};

export {CommentFullInformation};