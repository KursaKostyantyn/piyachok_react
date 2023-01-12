import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

import {CabinetMenu, Header} from "../../components";
import css from './LoggedLayout.module.css'

const LoggedLayout = () => {

    const {errors} = useSelector(state => state.users);
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
