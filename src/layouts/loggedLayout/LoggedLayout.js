import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {CabinetMenu, Header} from "../../components";
import css from './LoggedLayout.module.css'
import {authActions} from "../../redux";


const LoggedLayout = () => {

    const {errors} = useSelector(state => state.users);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(authActions.getAuthorizedUser())
    }, [dispatch])
    return (
        <div>
            <Header/>
            {errors && JSON.stringify(errors)}
            <div className={css.Wrap}>
                <div className={css.CabinetMenu}>
                    <CabinetMenu/>
                </div>
                <div className={css.OutletPlace}>
                    <Outlet/>
                </div>

            </div>


        </div>
    );
};

export {LoggedLayout};
