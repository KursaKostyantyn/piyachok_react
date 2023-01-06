import {Outlet} from "react-router-dom";

import {Header, Menu} from "../../components";
import css from './MainLayout.module.css'


const MainLayout = () => {
    return (
        <div className={css.Wrap}>
            <div>
                <Header/>
            </div>
            <div><Menu/></div>
            <div className={css.InfoSection}>
                    <div><Outlet/></div>
            </div>
        </div>
    );
};

export {MainLayout};