import {News} from "../news/News";
import {useDispatch} from "react-redux";
import {newsAction} from "../../redux";

const AllNews = () => {
    const dispatch = useDispatch();

    dispatch(newsAction.setCurrentNews(null));
    return (
        <div>
            <News findAllNews={true}/>
        </div>
    );
};

export {AllNews};