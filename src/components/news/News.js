import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {newsAction} from "../../redux";
import {OneNews} from "../oneNews/OneNews";


const News = ({findAllNews,}) => {
    const {news, currentNews} = useSelector(state => state.news);
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
        if (newUp) {
            setNewUp(false)
        } else {
            setNewUp(true)
        }
    }

    return (

        <div>
            {!currentNews ? <div>
                    <button onClick={newest}>{newUp ? <span>Спочатку нові новини</span> :
                        <span>Спочатку старі новини</span>}</button>
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

export {News};
