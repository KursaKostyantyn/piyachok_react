import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ratingActions} from "../../redux";

const RatingShortInformation = ({rating}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentRating=()=>{
        navigate(`${rating.id}`)
    }

    return (
        <div>

            <div>Id: {rating.id}</div>
            <div>Назва закладу: {rating.placeName}</div>
            <div>Оцінка: {rating.rating}</div>
            <button onClick={currentRating}>Деталі</button>
            <hr/>

        </div>
    );
};

export {RatingShortInformation};