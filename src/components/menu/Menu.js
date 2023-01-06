import {NavLink} from "react-router-dom";

import css from './Menu.module.css'

const Menu = () => {
    return (
        <div className={css.Menu}>
            <NavLink to={'search'}>Пошук</NavLink>
            <NavLink to={'places'}>Заклади</NavLink>
            <NavLink to={'news'}>Новини</NavLink>
        </div>
    );
};

export {Menu};