import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {placeActions} from "../../redux";
import {PlaceShortInformation} from "../placeShortInformation";
import css from './Places.module.css'


const Places = ({isMyPlaces}) => {
    const {places} = useSelector(state => state.places);
    const {authorizedUser} = useSelector(state => state.auth);
    const [placesForRender, setPlacesForRender] = useState([]);

    const dispatch = useDispatch();


    useEffect(() => {
        if (isMyPlaces && authorizedUser !== null) {
            setPlacesForRender(authorizedUser.places)
        } else {

            dispatch(placeActions.findAllPlaces())
            setPlacesForRender(places)
        }
    }, [dispatch,authorizedUser])


    return (
        <div className={css.Wrap}>
            {placesForRender.map((place) => <PlaceShortInformation key={place.id} place={place}/>)}
        </div>
    );
};

export {Places};