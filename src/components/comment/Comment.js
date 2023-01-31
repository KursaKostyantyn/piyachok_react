import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import {commentsActions} from "../../redux";


const Comment = ({comment}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {id, text, placeName} = comment;


    const currentComment = () => {
        dispatch(commentsActions.setCurrentComment(comment));
        navigate(`${id}`)
    }


    return (
        <div>
            <div>id: {id}</div>
            <div>Назва закладу: {placeName}</div>
            <div>Коментарій: {text}</div>
            <button onClick={currentComment}>Деталі</button>

        </div>
    );
};

export {Comment};