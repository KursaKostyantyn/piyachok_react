import {Piyachok} from "../piyachok/Piyachok";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {piyachokActions} from "../../redux";
import {useLocation, useParams, useSearchParams} from "react-router-dom";


const Piyachoks = () => {
    const {
        piyachoks,
        comments,
        currentPage,
        amountOfPages,
        nextPage,
        previousPage
    } = useSelector(state => state.piyachoks);
    const dispatch = useDispatch();
    const [query, setQuery] = useSearchParams({page: '1', old: 'false'});
   const params = useParams();

    useEffect(() => {

        if (params.placeId!==undefined){
            dispatch(piyachokActions.findPiyachokByPlaceId({page: query.get('page'), old: query.get('old'), placeId:params.placeId}))
        } else {
            dispatch(piyachokActions.findAllPiyachok({page: query.get('page'), old: query.get('old')}))
        }

    }, [query])

    const setOld = () => {
        let old = query.get('old');
        if (old === 'true') {
            setQuery({old: 'false'})
        }
        if (old === 'false') {
            setQuery({old: 'true'})
        }
    }

    const goToPreviousPage = () => {
        const page = +query.get('page') - 1;
        const old = query.get('old')
        setQuery({page: `${page}`, old: `${old}`})
    }

    const goToNextPage = () => {
        const page = +query.get('page') + 1;
        const old = query.get('old')
        setQuery({page: `${page}`, old: `${old}`})
    }


    return (
        <div>
            <div>
                {query.get('old') === 'false' ? <button onClick={setOld}>Спочатку старі пиячки</button> :
                    <button onClick={setOld}>Спочатку нові пиячки</button>}
            </div>


            <button onClick={goToPreviousPage} disabled={previousPage === 0}>Попередня сторінка</button>
            <span>{currentPage} з {amountOfPages}</span>
            <button onClick={goToNextPage} disabled={nextPage === 0}>Наступна сторінка</button>
            {piyachoks.map(piyachok => <Piyachok key={piyachok.id} piyachok={piyachok}/>)}
        </div>
    );
};

export {Piyachoks};