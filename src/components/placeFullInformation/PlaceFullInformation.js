import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {newsAction, placeActions} from "../../redux";
import css from "./PlaceFullInformation.module.css";
import {OneNews} from "../oneNews/OneNews";


const PlaceFullInformation = () => {
    const {id} = useParams();
    const {currentPlace} = useSelector(state => state.places);
    const {currentNews} = useSelector(state => state.news);

    const dispatch = useDispatch();

    const [currentPlaceNews, setCurrentPlaceNews] = useState([]);
    const [newUp, setNewUp] = useState(true);
    const [place, setPlace] = useState(null);


    useEffect(() => {
        dispatch(placeActions.findPlaceById(id))
    }, [dispatch])


    useEffect(() => {
        if(currentPlace!==null){
            setPlace(currentPlace)
            setCurrentPlaceNews(currentPlace.news)
        }
    }, [currentPlace])

    const newest = () => {
        if (newUp) {
            setNewUp(false)
        } else {
            setNewUp(true)
        }
    }

    const allNews = () => {
        dispatch(newsAction.setCurrentNews(null))
    }

    return (
        <div>
            {place && <div className={css.Wrap}>
                <img className={css.PlaceFullInformationPhoto}
                     src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Nophoto.jpg"
                     alt="place photo"/>

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
                <div>averageCheck: {place.averageCheck}</div>
                <div>creationDate: {place.creationDate}</div>
                <div>type: {place.type}</div>
                <div>description: {place.description}</div>
            </div>}
            <h3>Новини закладу</h3>

            {!currentNews ?
                <div>

                    <button onClick={newest}>{newUp ? <span>Спочатку старі новини</span> :
                        <span>Спочатку нові новини</span>}</button>
                    {newUp ? currentPlaceNews.slice(0).reverse().map(oneNews => <OneNews key={oneNews.id}
                                                                                         oneNews={oneNews}
                                                                                         details={true}/>) :
                        currentPlaceNews.map(oneNews => <OneNews key={oneNews.id} oneNews={oneNews} details={true}/>)}
                </div> :
                <div>
                    <button onClick={allNews}>Показати всі новини</button>
                    <OneNews key={currentNews.id} oneNews={currentNews} details={false}/>
                </div>
            }


        </div>
    );
};

export {PlaceFullInformation};