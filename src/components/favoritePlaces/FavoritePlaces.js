import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {userActions} from "../../redux";
import {PlaceShortInformation} from "../placeShortInformation";
import css from './FavoritePlaces.module.css'

const FavoritePlaces = () => {
    const {favoritePlaces} = useSelector(state => state.users);
    const {authorizedUser} = useSelector(state => state.auth);
const dispatch = useDispatch();

    useEffect(()=>{
        if(authorizedUser!==null){
            dispatch(userActions.getFavoritePlacesByUserLogin({login:authorizedUser.login}))

        }
    },[dispatch,authorizedUser])

    return (
        <div className={css.Wrap}>
            {favoritePlaces.map(place=><PlaceShortInformation key={place.id} place={place}/>)}
        </div>
    );
};

export {FavoritePlaces};