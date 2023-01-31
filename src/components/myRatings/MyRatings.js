import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {ratingActions} from "../../redux";
import {RatingShortInformation} from "../ratingShortInformation/RatingShortInformation";

const MyRatings = () => {
    const {ratings} = useSelector(state => state.ratings);
    const {authorizedUser} = useSelector(state => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        if (authorizedUser !== null) {
            dispatch(ratingActions.findRatingsByUserLogin({login: authorizedUser.login}))
        }

    }, [dispatch])

    return (
        <div>
            {ratings.map(rating => <RatingShortInformation key={rating.id} rating={rating}/>)}
        </div>
    );
};

export {MyRatings};