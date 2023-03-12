import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {featureActions} from "../../redux";

const FeatureFullInformation = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {currentFeature} = useSelector(state => state.features);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        dispatch(featureActions.findFeatureById({featureId: params.featureId}))
    }, [params.featureId])

    const update = () => {
        navigate('updateFeature')
    }

    const deleteFeature =async () => {
        await dispatch(featureActions.deleteFeatureById({featureId: params.featureId}))
        navigate(location.pathname.replace(`/${params.featureId}`,''))
    }

    return (
        <div>
            {currentFeature && <div>
                <div>id: {currentFeature.id}</div>
                <div>Особливість: {currentFeature.name}</div>
                <button onClick={update}>Редагувати</button>
                <button onClick={deleteFeature}>Видалити особливість</button>
            </div>}
        </div>
    );
};

export {FeatureFullInformation};