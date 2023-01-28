import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {placeActions} from "../../redux";
import {PlaceShortInformation} from "../placeShortInformation";
import css from './Places.module.css'
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";


const Places = () => {
    const {places, previousPage, nextPage, amountOfPages,currentPage} = useSelector(state => state.places);
    const {authorizedUser} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [query, setQuery] = useSearchParams({page: '1'});
    const navigate = useNavigate();
    const location = useLocation();
    const [isMyCabinet,setIsMyCabinet] = useState(false);


    useEffect(() => {
        dispatch(placeActions.findAllPlaces({page: query.get('page')}));
        if(location.pathname.includes('myCabinet')){
            setIsMyCabinet(true)
        } else {
            setIsMyCabinet(false)
        }
    }, [query])


    const goToPreviousPage = () => {
        const page = +query.get('page') - 1;
        setQuery({page: `${page}`})
    };

    const goToNextPage = () => {
        const page = +query.get('page') + 1;
        setQuery({page: `${page}`})
    };
    const addPlace=()=>{
        navigate('/myCabinet/createPlace')
    }

    return (
        <div className={css.Wrap}>
            <div>{isMyCabinet && authorizedUser && <button onClick={addPlace}>Додати заклад</button>}</div>
            <div>
                <button disabled={previousPage === 0} onClick={goToPreviousPage}>Попередня сторінка</button>
                <span>Сторінка {currentPage} з {amountOfPages} </span>
                <button disabled={nextPage === 0} onClick={goToNextPage}>Наступна сторінка</button>
            </div>
            <div className={css.PlaceSection}>
                {places.map((place) => <PlaceShortInformation key={place.id} place={place}/>)}
            </div>
        </div>
    );
};

export {Places};