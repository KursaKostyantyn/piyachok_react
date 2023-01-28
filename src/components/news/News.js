import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {newsAction} from "../../redux";
import {OneNews} from "../oneNews/OneNews";



const News = ({findAllNews,}) => {
    const {news} = useSelector(state => state.news);
    const dispatch = useDispatch();
    const [newUp, setNewUp] = useState(true);


    useEffect(() => {
        if (findAllNews) {
            dispatch(newsAction.findAllNews());
        } else {
            dispatch(newsAction.findMainNews());
        }

    }, [dispatch, findAllNews])


    const newest = () => {
        setNewUp(!newUp);
        if (findAllNews) {
            dispatch(newsAction.findAllNews({old:newUp}));
        } else {
            dispatch(newsAction.findMainNews({old: newUp}));
        }
    }


    return (
        <div>
            <div>
                <button onClick={newest}>{!newUp ? <span>Спочатку нові новини</span> :
                    <span>Спочатку старі новини</span>}</button>
                {news.map(oneNews => <OneNews key={oneNews.id} oneNews={oneNews} details={true}/>)}
            </div>
        </div>

    )
        ;
};

export {News};
