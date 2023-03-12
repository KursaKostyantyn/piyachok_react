import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {typeActions} from "../../redux";

const TypeFullInformation = () => {
    const {currentType} = useSelector(state => state.types);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    useEffect(() => {
        dispatch(typeActions.findTypeById({typeId: params.typeId}))
    }, [params.typeId])

    const updateType = () => {
        navigate('updateType')
    }

    const deleteType = async () => {
        await dispatch(typeActions.deleteTypeById({typeId: params.typeId}))
        navigate(location.pathname.replace(`${params.typeId}`,''))
    }

    return (
        <div>
            {currentType &&
                <div>
                    <div>Id: {currentType.id}</div>
                    <div>Назва типу: {currentType.name}</div>
                </div>
            }
            <button onClick={updateType}>Редагувати тип</button>
            <button onClick={deleteType}>Видалити тип</button>

        </div>
    );
};

export {TypeFullInformation};