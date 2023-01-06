import {AllNews} from "../../components";
import {useNavigate} from "react-router-dom";

const AllNewsPage = () => {
    const navigate = useNavigate();

    const goToMainNews=()=>{
        navigate("/main/news/mainNews")
    }

    return (
        <div>
            <button onClick={goToMainNews}>Дивитись загальні новини</button>
            <AllNews/>
        </div>
    );
};

export {AllNewsPage};