import {useNavigate} from "react-router-dom";

const TypeShortInformation = ({type}) => {
    const navigate = useNavigate();

    const details=()=>{
    navigate(`${type.id}`)
    }

    return (
        <div>
            <div>Назва типу: {type.name}</div>
            <button onClick={details}>Деталі</button>
            <hr/>

        </div>
    );
};

export {TypeShortInformation};