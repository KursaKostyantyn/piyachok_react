import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

import {newsAction} from "../../redux";
import {OneNews} from "../oneNews/OneNews"

const MainNews = () => {
    const {news, previousPage, nextPage, amountOfPages, currentPage} = useSelector(state => state.news);
    const dispatch = useDispatch();
    const [newUp, setNewUp] = useState(true);
    const navigate = useNavigate();
    const [query, setQuery] = useSearchParams({page: '1'});
    const location = useLocation();

    const goToAllNews = () => {
        navigate(location.pathname.replace('mainNews', 'allNews'))
    }

    useEffect(() => {
        dispatch(newsAction.findMainNews({old: newUp, page: query.get('page')}));
    }, [newUp, query])


    const newest = () => {
        setNewUp(!newUp);
    }


    const goToPreviousPage = () => {
        const page = +query.get('page') - 1;
        setQuery({page: `${page}`});
    };

    const goToNextPage = () => {
        const page = +query.get('page') + 1;
        setQuery({page: `${page}`})
    };

    return (
        <div>
            <div>
                <button onClick={goToAllNews}>Дивитись всі новини</button>
                <button onClick={newest}>{newUp ? <span>Спочатку нові новини</span> :
                    <span>Спочатку старі новини</span>}</button>
                <br/>
                <button disabled={previousPage === 0} onClick={goToPreviousPage}>Попередня сторінка</button>
                <span>Сторінка {currentPage} з {amountOfPages} </span>
                <button disabled={nextPage === 0} onClick={goToNextPage}>Наступна сторінка</button>
                {news.map(oneNews => <OneNews key={oneNews.id} oneNews={oneNews} details={true}/>)}
            </div>
        </div>

    )
        ;
};

export {MainNews};