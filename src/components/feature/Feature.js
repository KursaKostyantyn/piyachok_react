import {useNavigate} from "react-router-dom";

const Feature = ({feature}) => {
    const navigate = useNavigate();
    const {id,name}=feature;

    const details=()=>{
        navigate(`${id}`)
    }

    return (
        <div>
            <div>Особливість: {name}</div>
            <button onClick={details}>Деталі</button>
            <hr/>
        </div>
    );
};

export {Feature};