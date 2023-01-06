import {newsAction} from "../../redux";

import {useDispatch} from "react-redux";


const OneNews = ({oneNews, details}) => {
    const {id, category, creationDate, text, placeName} = oneNews;
    const dispatch = useDispatch();


    const setCurrentNews = () => {
        dispatch(newsAction.setCurrentNews(oneNews))
    }


    return (
        <div>
            <div>id: {id}</div>
            <div>Категорія: {category}</div>
            <div>Назва закладу: {placeName}</div>
            <div>Дата новини: {creationDate}</div>
            <div>Текст: {text}</div>
            {details && <button onClick={setCurrentNews}>Деталі новини </button>}

            <hr/>
        </div>
    );
};

export {OneNews};