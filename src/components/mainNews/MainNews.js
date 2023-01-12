import {News} from "../news/News";
import {useDispatch} from "react-redux";
import {newsAction} from "../../redux";
import {useNavigate} from "react-router-dom";

const MainNews = () => {
    const dispatch = useDispatch();
    dispatch(newsAction.setCurrentNews(null));
    const navigate = useNavigate();
    const goToAllNews=()=>{
        navigate('/main/news/allNews')
    }

    return (

        <div>
            <button onClick={goToAllNews}>Дивитись всі новини</button>
          <News findAllNews={false}/>
        </div>

    );
};

export {MainNews};