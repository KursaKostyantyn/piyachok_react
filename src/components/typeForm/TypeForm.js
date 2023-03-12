import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {typeActions} from "../../redux";

const TypeForm = () => {
    const {currentType} = useSelector(state => state.types);
    const dispatch = useDispatch();
    const {register, setValue, handleSubmit} = useForm();
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (params.typeId !== undefined) {
            dispatch(typeActions.findTypeById({typeId: params.typeId}))
        }
    }, [params])

    useEffect(() => {
        if (currentType !== null) {
            setValue('name', currentType.name)
        }
    }, [currentType])

    const updateType = async (data) => {
        await dispatch(typeActions.updateType({typeId: params.typeId, type: data}))
        navigate(location.pathname.replace("updateType", ""))
    }

    const saveType = async (data) => {

        await dispatch(typeActions.saveType({type: data}));
        navigate(location.pathname.replace('createType',''))
    }

    return (
        <div>
            <form>
                <input type={'text'} placeholder={'name'} {...register('name')}/>
                <div>
                    {currentType ? <button onClick={handleSubmit(updateType)}>Оновити тип</button> :
                        <button onClick={handleSubmit(saveType)}>Створити тип</button>}
                </div>

            </form>
        </div>
    );
};

export {TypeForm};