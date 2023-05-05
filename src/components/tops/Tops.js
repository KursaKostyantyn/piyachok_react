import {Top} from "../top/Top";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {featureActions, topActions} from "../../redux";

const Tops = () => {
    const {tops,currentPage, previousPage, nextPage, amountOfPages} = useSelector(state => state.tops);
    const dispatch = useDispatch();
    const [query, setQuery] = useSearchParams({page: '1'});
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(topActions.findAllTops({page:query.get('page')}))
    },[query,dispatch])

    const goToPreviousPage = () => {
        const page = +query.get('page') - 1;
        setQuery({page: `${page}`})

    }
    const goToNextPage = () => {
        const page = +query.get('page') + 1;
        setQuery({page: `${page}`})
    }

    const createTop =async () => {
        await dispatch(featureActions.setCurrentFeature(null))
        navigate('createTop');
    }



    return (
        <div>
            <div>
                <button onClick={createTop}>Створити нову особливість</button>
            </div>
            <button onClick={goToPreviousPage} disabled={previousPage === 0}> Попередня сторінка</button>
            <span>{currentPage} сторінка з {amountOfPages}</span>
            <button onClick={goToNextPage} disabled={nextPage === 0}> Попередня сторінка</button>
            {tops.map(top=><Top key={top.id} top={top}/> )}
        </div>
    );
};

export {Tops};