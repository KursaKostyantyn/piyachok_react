import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

import {userActions} from "../../redux";

const ActivateUser = () => {
    const {errors} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        dispatch(userActions.activateUser({activateToken: searchParams.get('activateToken')}))
    }, [dispatch])

    return (
        <div>
            {!errors ? <span>The user is activated</span> : <span>Упс щось пішло не так</span>}
        </div>
    );
};

export {ActivateUser};