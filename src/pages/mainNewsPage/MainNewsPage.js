import {MainNews} from "../../components";
import {useNavigate} from "react-router-dom";

const MainNewsPage = () => {
    const navigate = useNavigate();

    const goToAllNews=()=>{
        navigate('/main/news/allNews')
    }

    return (
        <div>
            <button onClick={goToAllNews}>Дивитись всі новини</button>
            <MainNews/>
        </div>
    );
};

export {MainNewsPage};