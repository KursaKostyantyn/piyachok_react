import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {favoritePlacesAction} from "../../redux";
import {PlaceShortInformation} from "../placeShortInformation";
import css from './FavoritePlaces.module.css'

const FavoritePlaces = () => {
    const {favoritePlaces} = useSelector(state => state.favoritePlaces);
    const {authorizedUser} = useSelector(state => state.auth);
const dispatch = useDispatch();

    useEffect(()=>{
        if(authorizedUser!==null){
            dispatch(favoritePlacesAction.getFavoritePlacesByUserLogin({login:authorizedUser.login}))
        }
    },[dispatch,authorizedUser])

    return (
        <div className={css.Wrap}>
            {favoritePlaces.map(place=><PlaceShortInformation key={place.id} place={place}/>)}
        </div>
    );
};

export {FavoritePlaces};