import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {featureActions} from "../../redux";

const FeatureForm = () => {
    const {register, setValue, handleSubmit, reset} = useForm();
    const {currentFeature} = useSelector(state => state.features);
    const dispatch = useDispatch();
    const params = useParams();
    const {authorizedUser} = useSelector(state => state.auth);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);


    useEffect(() => {
        if (params.featureId !== undefined) {
            dispatch(featureActions.findFeatureById({featureId: params.featureId}))
        }
    }, [])

    useEffect(() => {
        if (currentFeature !== null) {
            setValue('id', currentFeature.id)
            setValue('name', currentFeature.name)
        }
    }, [currentFeature])

    useEffect(() => {
        if (authorizedUser !== null && authorizedUser.role === 'ROLE_SUPERADMIN') {
            setIsSuperAdmin(true)
        } else {
            setIsSuperAdmin(false);
        }
    }, [authorizedUser])


    const saveFeature = async (data) => {
        await dispatch(featureActions.saveFeature({feature: data}));
        reset();
    }

    const updateFeature = async (data) => {
        await dispatch(featureActions.updateFeatureById({featureId: params.featureId, feature: data}))
    }


    return (
        <div>
            {isSuperAdmin &&
                <form>
                    <h4>Id</h4>
                    <input type={'text'} disabled={true} placeholder={"id"} {...register('id')}/> <br/>
                    <h4>Назва особливості</h4>
                    <input type={'text'} placeholder={"name"} {...register('name')}/> <br/>
                    {currentFeature ? <button onClick={handleSubmit(updateFeature)}>Оновити особливість</button> :
                        <button onClick={handleSubmit(saveFeature)}>Зберегти особливість</button>
                    }
                </form>
            }

        </div>
    );
};

export {FeatureForm};