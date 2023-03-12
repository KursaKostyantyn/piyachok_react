import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {typeActions} from "../../redux";
import {TypeShortInformation} from "../typeShortInformation/TypeShortInformation";
import {useNavigate, useSearchParams} from "react-router-dom";

const Types = () => {
    const {types, amountOfPages, nextPage, previousPage, currentPage} = useSelector(state => state.types);
    const dispatch = useDispatch();
    const [query, setQuery] = useSearchParams({page: '1', old: 'false'});
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(typeActions.findAllTypes({page: query.get('page')}));
    }, [query])

    const goToPreviousPage = () => {
        const page = +query.get('page') - 1;
        setQuery({page: `${page}`})
    }

    const goToNextPage = () => {
        const page = +query.get('page') + 1;
        setQuery({page: `${page}`})
    }

    const saveType=()=>{
        navigate('createType')
    }

    return (
        <div>
            <div>
                <button onClick={saveType}>Створити новий тип</button>
            </div>
            <button onClick={goToPreviousPage} disabled={previousPage === 0}>Попередня сторінка</button>
            <span>{currentPage} з {amountOfPages}</span>
            <button onClick={goToNextPage} disabled={nextPage === 0}>Наступна сторінка</button>
            {types.map(type => <TypeShortInformation key={type.id} type={type}/>)}
        </div>
    );
};

export {Types};