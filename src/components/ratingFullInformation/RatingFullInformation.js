import {useSelector} from "react-redux";

const RatingFullInformation = () => {
    const {currentRating} = useSelector(state => state.ratings);
    const {id, rating, place:{name}} = currentRating;

    return (
        <div>
            <div>Id: {id}</div>
            <div>Назва закладу: {name}</div>
            <div>Оцінка: {rating}</div>
        </div>
    );
};

export {RatingFullInformation};