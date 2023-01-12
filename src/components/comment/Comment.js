import {useNavigate} from "react-router-dom";

import {commentsActions} from "../../redux";
import {useDispatch} from "react-redux";

const Comment = ({comment}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {id, text, place} = comment;
    const currentComment = () => {
        dispatch(commentsActions.setCurrentComment(comment));
        navigate(`${id}`)
    }


    return (
        <div>
            <div>id: {id}</div>
            <div>Назва закладу: {place.name}</div>
            <div>Коментарій: {text}</div>
            <button onClick={currentComment}>Деталі</button>

        </div>
    );
};

export {Comment};