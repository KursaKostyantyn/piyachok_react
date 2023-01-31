import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {userActions} from "../../redux";
import {useSearchParams} from "react-router-dom";

const ActivateUser = () => {
    const {errors} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

useEffect(()=>{
    console.log(errors)
},[errors])

    useEffect(() => {
        dispatch(userActions.activateUserById({userId: searchParams.get('userId')}))
        console.log('this dispatch')
    }, [dispatch])

    return (
        <div>
            {!errors ? <span>The user is activated</span> : <span>Упс щось пішло не так</span>}
        </div>
    );
};

export {ActivateUser};