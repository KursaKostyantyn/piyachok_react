import {useSelector} from "react-redux";
import {OneNews} from "../oneNews/OneNews";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const PlaceNews = () => {
    const {currentPlace} = useSelector(state => state.places);
    const [newFirst, setNewFirst] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();


    const newNews = () => {
        setNewFirst(!newFirst)
    }


    const goToAddNews = () => {
        navigate('addNews')
    }

    return (
        <div>
            <div>
                {location.pathname.includes('myCabinet') && <button onClick={goToAddNews}>Додати новину</button>}
            </div>
            {!newFirst ? <button onClick={newNews}>Спочатку нові новини</button> :
                <button onClick={newNews}>Спочатку старі новини</button>}
            {newFirst ?
                <div>{currentPlace && currentPlace.news.map(oneNews => <OneNews key={oneNews.id} oneNews={oneNews}
                                                                                details={true}/>)}</div> :

                <div> {currentPlace && currentPlace.news.slice(0).reverse().map(oneNews => <OneNews key={oneNews.id}
                                                                                                    oneNews={oneNews}
                                                                                                    details={true}/>)}</div>


            }


        </div>
    );
};

export {PlaceNews};