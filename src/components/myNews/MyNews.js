import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {OneNews} from "../oneNews/OneNews";
import {newsAction} from "../../redux";
import {useSearchParams} from "react-router-dom";

const MyNews = () => {
    const {currentNews, news, previousPage, nextPage, amountOfPages, currentPage} = useSelector(state => state.news);
    const {authorizedUser} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [newUp, setNewUp] = useState(true);
    const [query, setQuery] = useSearchParams({page: '1'});


    useEffect(() => {
        if (authorizedUser !== null) {
            dispatch(newsAction.findNewsByUserId({old: newUp, page: query.get('page'), userId: authorizedUser.id}))
        }
    }, [authorizedUser, query])


    const newest = () => {
        if (newUp) {
            setNewUp(false)
        } else {
            setNewUp(true)
        }
    }

    const goToAllNews = () => {
        dispatch(newsAction.setCurrentNews(null));
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
            {currentNews && <button onClick={goToAllNews}>Дивитись всі новини</button>}
            {!currentNews ? <div>
                    <button onClick={newest}>{newUp ? <span>Спочатку нові новини</span> :
                        <span> Спочатку старі новини</span>}</button>
                    <div>
                        <button disabled={previousPage === 0} onClick={goToPreviousPage}>Попередня сторінка</button>
                        <span>Сторінка {currentPage} з {amountOfPages} </span>
                        <button disabled={nextPage === 0} onClick={goToNextPage}>Наступна сторінка</button>
                    </div>
                    {newUp ? news.slice(0).reverse().map(oneNews => <OneNews key={oneNews.id} oneNews={oneNews}
                                                                             details={true}/>) :
                        news.map(oneNews => <OneNews key={oneNews.id} oneNews={oneNews} details={true}/>)}
                </div> :
                <div>
                    <OneNews key={currentNews.id} oneNews={currentNews} details={false}/>
                </div>
            }


        </div>
    );
};

export {MyNews};