import {useNavigate} from "react-router-dom";

import css from './PlaceShortInformation.module.css'

const PlaceShortInformation = ({place}) => {

    const navigate = useNavigate();

    const placeDetails = () => {
        navigate(`${place.id}`)
    }

    return (
        <div className={css.Wrap}>
            <img className={css.PlacePhoto} src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Nophoto.jpg"
                 alt="place photo"/>
            <div>id: {place.id}</div>
            <div>Назва закладу: {place.name}</div>
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