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
        navigate(location.pathname.replace('comments', 'news_').split('_')[0])
    }
    const gotoComments = () => {
        navigate(location.pathname.replace('news', 'comments_').split('_')[0])

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
                    <span>?????????????? 5 ????????????????????</span>
                    <form onSubmit={handleSubmit(addPhotos)}>
                        <input type={'file'}
                               accept='image/jpeg, image/png'
                               multiple
                               {...register('photos')}/> <br/>
                        <button>???????????? ????????</button>
                    </form>
                    {addPhotoError && <span>???????????????? ????????????????????</span>}

                </div>


                {canEdit &&
                    <div>
                        <button onClick={updatePlace}>???????????????????? ????????????</button>
                        <button onClick={deletePlace}>???????????????? ????????????</button>
                    </div>}
                {authorizedUser &&
                    <div>
                        {isFavorite ? <button onClick={deleteFromFavorite}>???????????????? ?? ??????????????????</button> :
                            <button onClick={addToFavorites}>???????????? ???? ??????????????????</button>}
                    </div>}
                <div>id: {place.id}</div>
                <div>?????????? ??????????????: {place.name}</div>

                <div> ??????????: {place.address.city} <br/>
                    ????????????: {place.address.street}<br/>
                    ?????????? ??????????????: {place.address.number}<br/>
                </div>
                <div>??????????????:
                    <div>????: {place.workSchedule.mondayStart}-{place.workSchedule.mondayEnd}</div>
                    <div>????: {place.workSchedule.tuesdayStart}-{place.workSchedule.tuesdayEnd}</div>
                    <div>????: {place.workSchedule.wednesdayStart}-{place.workSchedule.wednesdayEnd}</div>
                    <div>????: {place.workSchedule.thursdayStart}-{place.workSchedule.thursdayEnd}</div>
                    <div>????: {place.workSchedule.fridayStart}-{place.workSchedule.fridayEnd}</div>
                    <div>????: {place.workSchedule.saturdayStart}-{place.workSchedule.saturdayEnd}</div>
                    <div>????: {place.workSchedule.sundayStart}-{place.workSchedule.sundayEnd}</div>
                </div>
                <div>??????????????: {place.contacts.phone}</div>
                <div>?????????????????? ??????????: {place.contacts.email}</div>
                <div>???????????????? ??????: {place.averageCheck}</div>
                <div>???????????????? ??????????????: {place.averageRating}</div>
                <div>???????? ??????????????????: {place.creationDate}</div>
                <div>?????? ??????????????: {place.types.map(type => type.name + ',')}</div>
                <div>???????? ??????????????: {place.description}</div>


                {place.features.length !== 0 && <div>??????????????????????
                    ??????????????:{place.features.map(feature => feature.name + ',')} </div>}


            </div>}
            {<div><RatingForm/></div>}


            <button onClick={goToNews}>????????????</button>
            <button onClick={gotoComments}>??????????????????</button>

        </div>
    );
}

export {PlaceFullInformation};