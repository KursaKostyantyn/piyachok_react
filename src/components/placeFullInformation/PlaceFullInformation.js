import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import css from "./PlaceFullInformation.module.css";
import {placeActions, userActions} from "../../redux";
import {RatingForm, PlaceSmallImage} from "../index";


const PlaceFullInformation = () => {

    const {currentPlace, mainPlacePhoto} = useSelector(state => state.places);
    const {authorizedUser} = useSelector(state => state.auth);
    const {isFavorite} = useSelector(state => state.users);

    const [place, setPlace] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [addPhotoError, setAddPhotoError] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const params = useParams();
    const {register, handleSubmit} = useForm();

    useEffect(() => {
        if (((authorizedUser !== null
                && currentPlace !== null
                && authorizedUser.id === currentPlace.userId
                && !location.pathname.includes('favoritesPlaces')) ||
            (authorizedUser !== null && currentPlace !== null && authorizedUser.role.split("_")[1] === 'SUPERADMIN'))) {
            setCanEdit(true)
        } else {
            setCanEdit(false)
        }
    }, [authorizedUser, currentPlace, location.pathname])

    useEffect(() => {
        dispatch(placeActions.findPlaceById({id: params.placeId}))
    }, [dispatch, params.placeId])


    useEffect(() => {
        if (currentPlace != null && currentPlace.photos.length !== 0) {
            let arr = []
            dispatch(placeActions.setMainPLacePhoto(`http://localhost:8080/places/placePhoto/${currentPlace.photos[0]}`))
            for (let i = 0; i < currentPlace.photos.length; i++) {
                arr.push(`http://localhost:8080/places/placePhoto/${currentPlace.photos[i]}`)
                placeActions.setMainPLacePhoto(currentPlace.photos[i])

            }
            setPhotos(arr);
        } else {
            setPhotos(['http://via.placeholder.com/250x300?text=No+Photo'])
        }
    }, [currentPlace])

    useEffect(() => {
        if (currentPlace !== null) {
            setPlace(currentPlace)
        }
    }, [currentPlace])

    useEffect(() => {
        if (place !== null && authorizedUser !== null) {
            dispatch(userActions.checkPlaceIsFavoriteByPlaceIdAndUserLogin({
                placeId: place.id,
                login: authorizedUser.login
            }));
        }

    }, [place, authorizedUser])


    const deletePlace = async () => {
        await dispatch(placeActions.deletePlaceById({id: place.id}))
        navigate('/myCabinet/myPlaces')
    }

    const updatePlace = () => {
        navigate('update')
    }


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
        const pathArr = location.pathname.split('/')
        const replaceValue = pathArr[pathArr.length - 1]
        navigate(location.pathname.replace(replaceValue, 'news_').split('_')[0])
    }
    const gotoComments = () => {
        const pathArr = location.pathname.split('/')
        const replaceValue = pathArr[pathArr.length - 1]
        navigate(location.pathname.replace(replaceValue, 'comments_').split('_')[0])

    }

    const addPhotos = async (data) => {
        let formData = new FormData();
        if (data.photos.length !== 0 && data.photos.length <= 5) {
            setAddPhotoError(false);
            formData.append('placeId', place.id)
            for (let photo of data.photos) {
                formData.append('photos', photo);
            }
            await dispatch(placeActions.addPhotosToPlaceById({formData: formData}))
        } else {
            setAddPhotoError(true)
        }

    }

    const goToPiyachok = () => {
        const pathArr = location.pathname.split('/')
        const replaceValue = pathArr[pathArr.length - 1]
        navigate(location.pathname.replace(replaceValue, 'piyachok'))
    }

    const showAllPiyachoks=()=>{
        const pathArr = location.pathname.split('/')
        const replaceValue = pathArr[pathArr.length - 1]
        navigate(location.pathname.replace(replaceValue, 'placePiyachoks'))
    }

    return (
        <div>
            {place && <div className={css.PlaceWrap}>

                <div className={css.PlaceFullInformationPhotoSection}>
                    <img className={css.PhotoSection}
                         src={mainPlacePhoto}
                         alt="place"/>
                    <div className={css.SmallImageSection}>
                        {photos.map((photo, index) => <PlaceSmallImage key={index} photo={photo}/>)}
                    </div>
                    <span>Оберіть 5 фотографій</span>
                    <form onSubmit={handleSubmit(addPhotos)}>
                        <input type={'file'}
                               accept='image/jpeg, image/png'
                               multiple
                               {...register('photos')}/> <br/>
                        <button>Додати фото</button>
                    </form>
                    {addPhotoError && <span>Забагато фотографій</span>}

                </div>


                {canEdit &&
                    <div>
                        <button onClick={updatePlace}>Редагувати заклад</button>
                        <button onClick={deletePlace}>Видалити заклад</button>
                    </div>}
                {!location.pathname.includes('myCabinet') && <div>
                    {authorizedUser ? <button onClick={goToPiyachok}>пиячок</button> :
                        <div>
                            <button disabled={true}>пиячок</button>
                            - для можливості замовлення авторизуйтесь
                        </div>
                    }
                </div>
                }

                {location.pathname.includes('myCabinet') && <div>
                    <button onClick={showAllPiyachoks}>Показати всі замовлення</button>
                </div>}

                {authorizedUser &&
                    <div>
                        {isFavorite ? <button onClick={deleteFromFavorite}>Видалити з улюблених</button> :
                            <button onClick={addToFavorites}>Додати до улюблених</button>}
                    </div>}
                <div>id: {place.id}</div>
                <div>Назва закладу: {place.name}</div>

                <div> Місто: {place.address.city} <br/>
                    Вулиця: {place.address.street}<br/>
                    Номер будинку: {place.address.number}<br/>
                </div>
                <div>Розклад:
                    <div>Пн: {place.workSchedule.mondayStart}-{place.workSchedule.mondayEnd}</div>
                    <div>Вт: {place.workSchedule.tuesdayStart}-{place.workSchedule.tuesdayEnd}</div>
                    <div>Ср: {place.workSchedule.wednesdayStart}-{place.workSchedule.wednesdayEnd}</div>
                    <div>Чт: {place.workSchedule.thursdayStart}-{place.workSchedule.thursdayEnd}</div>
                    <div>Пт: {place.workSchedule.fridayStart}-{place.workSchedule.fridayEnd}</div>
                    <div>Сб: {place.workSchedule.saturdayStart}-{place.workSchedule.saturdayEnd}</div>
                    <div>Нд: {place.workSchedule.sundayStart}-{place.workSchedule.sundayEnd}</div>
                </div>
                <div>Телефон: {place.contacts.phone}</div>
                <div>Електрона пошта: {place.contacts.email}</div>
                <div>Середній чек: {place.averageCheck}</div>
                <div>Середній рейтінг: {place.averageRating}</div>
                <div>Дата створення: {place.creationDate}</div>
                <div>Тип закладу: {place.types.map(type => type.name + ',')}</div>
                <div>Опис закладу: {place.description}</div>


                {place.features.length !== 0 && <div>Особливості
                    закладу:{place.features.map(feature => feature.name + ',')} </div>}


            </div>}
            {<div><RatingForm/></div>}


            <button onClick={goToNews}>Новини</button>
            <button onClick={gotoComments}>Коментарі</button>

        </div>
    );
}

export {PlaceFullInformation};