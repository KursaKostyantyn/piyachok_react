import {useNavigate} from "react-router-dom";

import css from './PlaceShortInformation.module.css'
import {useEffect, useState} from "react";

const PlaceShortInformation = ({place}) => {
    const [photo, setPhoto] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        if (place != null && place.photos.length !== 0) {
            setPhoto(`http://localhost:8080/places/placePhoto/${place.photos[0]}`)
        } else {
            setPhoto('http://via.placeholder.com/250x300?text=No+Photo')
        }
    }, [])

    const placeDetails = () => {
        navigate(`${place.id}/news`)
    }

    return (
        <div className={css.Wrap}>
            <img className={css.PhotoSection}
                 src={photo}
                 alt="place photo"/>
            <div>id: {place.id}</div>
            <div>Назва закладу: {place.name}</div>
            <div>Середній чек: {place.averageCheck}</div>
            <div>Середній рейтінг: {place.averageRating}</div>
            <div> Адреса <br/>
                Місто: {place.address.city} <br/>
                вулиця: {place.address.street}<br/>
                номер дому: {place.address.number}<br/>
            </div>
            <div>Опис закладу: {place.description}</div>
            <button onClick={placeDetails}>Деталі закладу</button>

        </div>
    );
};

export {PlaceShortInformation};