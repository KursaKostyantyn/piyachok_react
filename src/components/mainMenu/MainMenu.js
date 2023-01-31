import {NavLink} from "react-router-dom";

import css from './MainMenu.module.css'

const MainMenu = () => {
    return (
        <div className={css.Menu}>
            {/*<NavLink to={'search'}>Пошук</NavLink>*/}
            <NavLink to={'places'}>Заклади</NavLink>
            <NavLink to={'news'}>Новини</NavLink>
        </div>
    );
};

export {MainMenu};