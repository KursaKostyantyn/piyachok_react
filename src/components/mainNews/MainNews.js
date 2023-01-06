import {News} from "../news/News";
import {useDispatch} from "react-redux";
import {newsAction} from "../../redux";

const MainNews = () => {
    const dispatch = useDispatch();
    dispatch(newsAction.setCurrentNews(null));

    return (

        <div>
          <News findAllNews={false}/>
        </div>

    );
};

export {MainNews};