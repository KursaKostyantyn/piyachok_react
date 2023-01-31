import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {placeActions, userActions} from "../../redux";
import css from "./PlaceFullInformation.module.css";
import {MyRatings} from "../myRatings/MyRatings";
import {PlaceRating} from "../placeRating/PlaceRating";
import {RatingForm} from "../ratingForm/RatingForm";


const PlaceFullInformation = () => {
    const params = useParams();
    const {currentPlace} = useSelector(state => state.places);
    const {authorizedUser} = useSelector(state => state.auth);
    const {isFavorite} = useSelector(state => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [place, setPlace] = useState(null);
    const location = useLocation();
    const [canEdit, setCanEdit] = useState(false);




    useEffect(() => {
        if (authorizedUser !== null
            && currentPlace !== null
            && authorizedUser.id === currentPlace.userId
            && !location.pathname.includes('favoritesPlaces')) {
            setCanEdit(true)
        } else {
            setCanEdit(false)
        }
    }, [])

    useEffect(() => {
        dispatch(placeActions.findPlaceById({id: params.placeId}))
    }, [dispatch])


    useEffect(() => {
        if (currentPlace !== null) {
            setPlace(currentPlace)
        }
    }, [currentPlace])

    const deletePlace = async () => {
        await dispatch(placeActions.deletePlaceById({id: place.id}))
        navigate('/myCabinet/myPlaces')
    }

    const updatePlace = () => {
        navigate('update')
    }

    useEffect(() => {
        if (place !== null && authorizedUser !== null) {
            dispatch(userActions.checkPlaceIsFavoriteByPlaceIdAndUserLogin({
                placeId: place.id,
                login: authorizedUser.login
            }));
        }

    }, [place])

    const addToFavorites = async () => {
        await dispatch(userActions.addPlaceToFavoriteByPlaceIdAndUserLogin({
            placeId: place.id,
            login: authorizedUser.login
        }))
        dispatch(userActions.setIsFavorite(true));
    }

    const deleteFromFavorite = async () => {
        await dispatch(userActions.deletePlaceFromFavoriteByPlaceIdUserLogin({
            placeId: place.id,
            login: authorizedUser.login
        }))
        dispatch(userActions.setIsFavorite(false));
    }

    const goToNews = () => {
        navigate(location.pathname.replace('comments', 'news'))
    }
    const gotoComments = () => {
        navigate(location.pathname.replace('news', 'comments'))
    }


    return (
        <div>
            {place && <div className={css.Wrap}>
                <img className={css.PlaceFullInformationPhoto}
                     src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Nophoto.jpg"
                     alt="place photo"/>
                {canEdit &&
                    <div>
                        <button onClick={updatePlace}>Редагувати заклад</button>
                        <button onClick={deletePlace}>Видалити заклад</button>
                    </div>}
                {authorizedUser &&
                    <div>
                        {isFavorite ? <button onClick={deleteFromFavorite}>Видалити з улюблених</button> :
                            <button onClick={addToFavorites}>Додати до улюблених</button>}
                    </div>}
                <div>id: {place.id}</div>
                <div>name: {place.name}</div>

                <div> city: {place.address.city} <br/>
                    street: {place.address.street}<br/>
                    number: {place.address.number}<br/>
                </div>
                <div>schedule: {place.schedule}</div>
                <div>phone: {place.contacts.phone}</div>
                <div>email: {place.contacts.email}</div>
                <div>averageCheck: {place.averageCheck}</div>
                <div>averageRating: {place.averageRating}</div>
                <div>creationDate: {place.creationDate}</div>
                <div>type: {place.type}</div>
                <div>description: {place.description}</div>
            </div>}
            {<div><RatingForm/></div>}


            <button onClick={goToNews}>Новини</button>
            <button onClick={gotoComments}>Коментарі</button>

        </div>
    );
};

export {PlaceFullInformation};