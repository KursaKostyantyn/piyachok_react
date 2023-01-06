import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {placeActions} from "../../redux";
import {PlaceShortInformation} from "../placeShortInformation";
import css from './Places.module.css'


const Places = () => {
    const {places} = useSelector(state => state.places);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(placeActions.findAllPlaces())
    }, [dispatch])




    return (
        <div className={css.Wrap}>
            {places.map((place) => <PlaceShortInformation key={place.id} place={place}/>)}
        </div>
    );
};

export {Places};