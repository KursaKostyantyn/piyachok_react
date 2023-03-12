import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {featureActions} from "../../redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Feature} from "../feature/Feature";

const Features = () => {
    const dispatch = useDispatch();
    const {features, currentPage, previousPage, nextPage, amountOfPages} = useSelector(state => state.features);
    const [query, setQuery] = useSearchParams({page: '1'});
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(featureActions.findAllFeatures({page: query.get('page')}));
    }, [query, dispatch])

    const goToPreviousPage = () => {
        const page = +query.get('page') - 1;
        setQuery({page: `${page}`})

    }
    const goToNextPage = () => {
        const page = +query.get('page') + 1;
        setQuery({page: `${page}`})
    }

    const createFeature =async () => {
       await dispatch(featureActions.setCurrentFeature(null))
        navigate('createFeature');
    }


    return (
        <div>
            <div>
                <button onClick={createFeature}>Створити нову особливість</button>
            </div>
            <button onClick={goToPreviousPage} disabled={previousPage === 0}> Попередня сторінка</button>
            <span>{currentPage} сторінка з {amountOfPages}</span>
            <button onClick={goToNextPage} disabled={nextPage === 0}> Попередня сторінка</button>
            {features.map(feature => <Feature key={feature.id} feature={feature}/>)}
        </div>
    );
};

export {Features};