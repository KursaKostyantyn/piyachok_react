import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";

import {placeActions} from "../../redux";
import {PlaceShortInformation} from "../placeShortInformation";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";

const SearchForm = () => {
    const {register, handleSubmit, setValue} = useForm();
    const {places, previousPage, nextPage, amountOfPages, currentPage} = useSelector(state => state.places);
    const dispatch = useDispatch();
    const [query, setQuery] = useSearchParams({page: '1', placeName: ``});


    const submit = (data) => {
        if (data.name === '') {
            dispatch(placeActions.setPlaces([]))
        } else {
            dispatch(placeActions.findPLaceByName({placeName: data.name}))
            setQuery({page: query.get('page'), placeName: `${data.name}`});
        }
    }

    useEffect(() => {
        if (query.get('placeName') !== '') {
            dispatch(placeActions.findPLaceByName({placeName: query.get('placeName'), page: query.get('page')}));
            setValue('name', query.get('placeName'))
        } else {
            {
                dispatch(placeActions.setPlaces([]))
            }
        }
    }, [query])

    const goToPreviousPage = () => {
        const page = +query.get('page') - 1;
        const placeName = query.get('placeName')
        setQuery({page: `${page}`, placeName: `${placeName}`});
    }

    const goToNextPage = () => {
        const page = +query.get('page') + 1;
        const placeName = query.get('placeName')
        setQuery({page: `${page}`, placeName: `${placeName}`});
    }


    return (
        <div>
            Пошук за назвою закладу
            <form onSubmit={handleSubmit(submit)}>
                <input type={'text'} placeholder={'name'} {...register('name')} />
                <button>Пошук</button>
            </form>
            {places.length !== 0 && <div>
                <button onClick={goToPreviousPage} disabled={previousPage === 0}>Попередня сторінка</button>
                <span> {currentPage} сторінка з {amountOfPages} </span>
                <button onClick={goToNextPage} disabled={nextPage === 0}>Наступна сторінка сторінка</button>
            </div>}
            {places.map(place => <PlaceShortInformation key={place.id} place={place}/>)}
        </div>
    );
};

export {SearchForm};