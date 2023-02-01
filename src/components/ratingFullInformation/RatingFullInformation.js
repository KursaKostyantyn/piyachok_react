import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {ratingActions} from "../../redux";

const RatingFullInformation = () => {
    const {currentRating} = useSelector(state => state.ratings);

    const dispatch = useDispatch();
    const {myRatingsId} = useParams();

    useEffect(() => {
        dispatch(ratingActions.findRatingById({myRatingsId}))
    }, [])


    return (
        <div>{currentRating &&
            <div>
                <div>Id: {currentRating.id}</div>
                <div>Назва закладу: {currentRating.placeName}</div>
                <div>Оцінка: {currentRating.rating}</div>
            </div>
        }
        </div>
    );
};

export {RatingFullInformation};