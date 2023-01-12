import {useNavigate} from "react-router-dom";

import css from './CabinetMenu.module.css'
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

const CabinetMenu = () => {
    const navigate = useNavigate();
    const {authorizedUser} = useSelector(state => state.auth);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);

    useEffect(()=>{
        if (authorizedUser!==null && authorizedUser.role.split('_')[1]==='SUPERADMIN'){
            setIsSuperAdmin(true);
        } else {
            setIsSuperAdmin(false)
        }
    },[])

    const mainMenu =()=>{
        navigate('/main/places')
    }

    const userProfile =()=>{
        navigate('profile')
    }

    const myPlaces =()=>{
        navigate('myPlaces')
    }

    const myNews=()=>{
        navigate('myNews')
    }

    const favoritePLaces=()=>{
        navigate('favoritePlaces')
    }

    const myComments=()=>{
        navigate('myComments')
    }

    const myRatings=()=>{
        navigate('myRatings')
    }

    const allUsers=()=>{
        navigate('allUsers')
    }



    return (
        <div>
            CabinetMenu
            <button className={css.CabinetMenuButtons} onClick={mainMenu}>Головне меню</button>
            <button className={css.CabinetMenuButtons} onClick={userProfile}>Мій профіль</button>
            <button className={css.CabinetMenuButtons} onClick={myPlaces}>Мої заклади</button>
            <button className={css.CabinetMenuButtons} onClick={myNews}>Мої новини</button>
            <button className={css.CabinetMenuButtons} onClick={favoritePLaces}>Улюблені заклади</button>
            <button className={css.CabinetMenuButtons} onClick={myComments}>Мої коментарі</button>
            <button className={css.CabinetMenuButtons} onClick={myRatings}>Мої оцінки</button>

            {isSuperAdmin && <button className={css.CabinetMenuButtons} onClick={allUsers}>Всі користувачі</button>}

        </div>
    );
};

export {CabinetMenu};