import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {ratingActions} from "../../redux";
import {Rating} from "../rating/Rating";

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
            {ratings.map(rating => <Rating key={rating.id} rating={rating}/>)}
        </div>
    );
};

export {MyRatings};