import {useNavigate} from "react-router-dom";

import css from './PlaceShortInformation.module.css'

const PlaceShortInformation = ({place}) => {

    const navigate = useNavigate();

    const chosenPlace = () => {
        navigate(`${place.id}`)
    }

    return (
        <div className={css.Wrap} onClick={chosenPlace}>
            <img className={css.PlacePhoto} src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Nophoto.jpg"
                 alt="place photo"/>
            <div>id: {place.id}</div>
            <div>name: {place.name}</div>
            <div> city: {place.address.city} <br/>
                street: {place.address.street}<br/>
                number: {place.address.number}<br/>
            </div>
            <div>description: {place.description}</div>
        </div>
    );
};

export {PlaceShortInformation};