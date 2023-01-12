import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {OneNews} from "../oneNews/OneNews";
import {newsAction} from "../../redux";

const MyNews = () => {
    const {currentNews} = useSelector(state => state.news);
    const {authorizedUser} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [newUp, setNewUp] = useState(true);
    const [news, setNews] = useState([]);

    useEffect(() => {
        if (authorizedUser !== null) {
            setNews(authorizedUser.news)
        }
    }, [authorizedUser])


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


    return (
        <div>
            {currentNews && <button onClick={goToAllNews}>Дивитись всі новини</button>}
            {!currentNews ? <div>
                    <button onClick={newest}>{newUp ? <span>Спочатку нові новини</span> :
                        <span> Спочатку старі новини</span>}</button>
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