import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

import {placeActions} from "../../redux";
import {PlaceShortInformation} from "../placeShortInformation";
import css from './Places.module.css'
import {useForm} from "react-hook-form";


const Places = () => {
    const {places, previousPage, nextPage, amountOfPages, currentPage} = useSelector(state => state.places);
    const {register, handleSubmit, reset} = useForm();
    const {authorizedUser} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [query, setQuery] = useSearchParams({page: '1'});
    const navigate = useNavigate();
    const location = useLocation();
    const [isMyCabinet, setIsMyCabinet] = useState(false);
    const [alphabet, setAlphabet] = useState(false);
    const [old, setOld] = useState(false);
    const [rating, setRating] = useState(false);
    const [averageCheck, setAverageCheck] = useState(false);


    useEffect(() => {
        if (authorizedUser && authorizedUser.role.split('_')[1] === 'SUPERADMIN' && location.pathname.includes('myPlaces')) {
            dispatch(placeActions.findPlaceByUserLogin({userLogin: authorizedUser.login, page: query.get('page')}))
        } else if (authorizedUser && authorizedUser.role.split('_')[1] === 'SUPERADMIN' && location.pathname.includes('notActivated')) {

        } else {
            dispatch(placeActions.findAllActivatedPlaces({
                page: query.get('page'),
                alphabet: query.get('alphabet'),
                old: query.get('old'),
                rating: query.get('rating'),
                averageCheck: query.get('averageCheck')
            }));
        }

        if (location.pathname.includes('myCabinet')) {
            setIsMyCabinet(true)
        } else {
            setIsMyCabinet(false)
        }
    }, [query, authorizedUser])


    const goToPreviousPage = () => {
        const page = +query.get('page') - 1;
        setQuery({page: `${page}`})
    };

    const goToNextPage = () => {
        const page = +query.get('page') + 1;
        setQuery({page: `${page}`})
    };
    const addPlace = () => {
        navigate('/myCabinet/createPlace')
    }

    const sortByAlphabet = () => {
        const page = +query.get('page');
        setOld(false);
        setAverageCheck(false);
        setRating(false);
        setAlphabet(!alphabet);
        setQuery({page: `${page}`, alphabet: `${alphabet}`})
    }

    const sortByDate = () => {
        setAlphabet(false);
        setAverageCheck(false);
        setRating(false);
        const page = +query.get('page');
        setOld(!old)
        setQuery({page: `${page}`, old: `${old}`})
    }

    const sortByRating = () => {
        setAlphabet(false);
        setAverageCheck(false);
        setOld(false);
        const page = +query.get('page');
        setRating(!rating)
        setQuery({page: `${page}`, rating: `${rating}`})
    }

    const sortByAverageCheck = () => {
        setAlphabet(false);
        setRating(false);
        setOld(false);
        const page = +query.get('page');
        setAverageCheck(!averageCheck);
        setQuery({page: `${page}`, averageCheck: `${averageCheck}`})
    }

    const submit = (data) => {
        if (data.sort === 'sortByAlphabet') {
            sortByAlphabet();
        }
        if (data.sort === 'sortByDate') {
            sortByDate();
        }
        if (data.sort === 'sortByRating') {
            sortByRating();
        }
        if (data.sort === 'sortByAverageCheck') {
            sortByAverageCheck();
        }
        reset()
    }

    return (
        <div className={css.Wrap}>
            <div>{isMyCabinet && authorizedUser && <button onClick={addPlace}>Додати заклад</button>}</div>
            <div>
                <form onSubmit={handleSubmit(submit)}>
                    <select name='select' {...register('sort')}>
                        <option value='default'>Оберіть вид сортування</option>
                        {alphabet ?
                            <option value='sortByAlphabet'>сортувати я-а</option> :
                            <option value='sortByAlphabet'>сортувати а-я</option>
                        }

                        {old ?
                            <option value='sortByDate'>спочатку старі</option> :
                            <option value='sortByDate'>спочатку нові</option>
                        }

                        {rating ?
                            <option value='sortByRating'>спочатку менший рейтинг</option> :
                            <option value='sortByRating'> спочатку більший рейтинг</option>
                        }

                        {averageCheck ?
                            <option value='sortByAverageCheck'>Спочатку менший чек</option> :
                            <option value='sortByAverageCheck'>Спочатку більший чек</option>
                        }


                    </select>
                    <button>Сортувати</button>
                </form>


            </div>
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