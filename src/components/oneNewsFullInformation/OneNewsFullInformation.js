import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

import {newsAction} from "../../redux";

const OneNewsFullInformation = () => {
    const {currentNews} = useSelector(state => state.news);
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [isCabinet, setIsCabinet] = useState(false);


    useEffect(() => {
        if (location.pathname.includes('myCabinet')) {
            setIsCabinet(true);
        }
    }, [dispatch])


    const goBack = () => {
        dispatch(newsAction.setCurrentNews(null))
        navigate(location.pathname.replace(`/news/${params.newsId}`, ''));
    }


    useEffect(() => {
        dispatch(newsAction.findNewsById({id: params.newsId}))

    }, [dispatch])

    const updateNews = () => {
        navigate('update')
    }

    const deleteNews = async () => {
        await dispatch(newsAction.deleteNewsById({id: currentNews.id}))
        await dispatch(newsAction.setCurrentNews(null))
        navigate(location.pathname.replace(`/news/${currentNews.id}`, ''))
    }


    return (

        <div>
            {currentNews &&
                <div>
                    <button onClick={goBack}>Дивитись всі новини</button>
                    <div>id: {currentNews.id}</div>
                    <div>Категорія: {currentNews.category}</div>
                    <div>Назва закладу: {currentNews.placeName}</div>
                    <div>Дата новини: {currentNews.creationDate}</div>
                    <div>Текст: {currentNews.text}</div>
                    {isCabinet && <div>
                        <button onClick={updateNews}>Редагувати новину</button>
                        <button onClick={deleteNews}>Видалити новину</button>
                    </div>}

                </div>
            }
        </div>


    );
};

export {OneNewsFullInformation};