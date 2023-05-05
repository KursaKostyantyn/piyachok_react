import {useNavigate} from "react-router-dom";

import css from './CabinetMenu.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {newsAction} from "../../redux";

const CabinetMenu = () => {
    const navigate = useNavigate();
    const {authorizedUser} = useSelector(state => state.auth);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        if (authorizedUser !== null && authorizedUser.role.split('_')[1] === 'SUPERADMIN') {
            setIsSuperAdmin(true);
        } else {
            setIsSuperAdmin(false)
        }
    }, [authorizedUser])

    const mainMenu = () => {
        navigate('/main/places')
    }

    const userProfile = () => {
        navigate('profile')
    }

    const myPlaces = () => {
        navigate('myPlaces')
    }

    const myNews = () => {
        dispatch(newsAction.setCurrentNews(null));
        navigate('myNews')
    }

    const favoritePLaces = () => {
        navigate('favoritePlaces')
    }

    const myComments = () => {
        navigate('myComments')
    }

    const myRatings = () => {
        navigate('myRatings')
    }

    const allUsers = () => {
        navigate('allUsers')
    }

    const allPlaces = () => {
        navigate('allPlaces')
    }

    const allComments = () => {
        navigate('allComments')
    }

    const allNews = () => {
        navigate('news')
    }

    const allTypes=()=>{
        navigate('allTypes')
    }

    const notActivated=()=>{
        navigate('notActivated')
    }

    const allFeatures=()=>{
        navigate('features')
    }

    const allPiyachoks=()=>{
        navigate('piyachoks')
    }

    const allTops=()=>{
        navigate('tops')
    }


    return (
        <div className={css.Wrap}>
            CabinetMenu
            <button className={css.CabinetMenuButtons} onClick={mainMenu}>Головна сторінка</button>
            <button className={css.CabinetMenuButtons} onClick={userProfile}>Мій профіль</button>
            <button className={css.CabinetMenuButtons} onClick={myPlaces}>Мої заклади</button>
            <button className={css.CabinetMenuButtons} onClick={myNews}>Мої новини</button>
            <button className={css.CabinetMenuButtons} onClick={favoritePLaces}>Улюблені заклади</button>
            <button className={css.CabinetMenuButtons} onClick={myComments}>Мої коментарі</button>
            <button className={css.CabinetMenuButtons} onClick={myRatings}>Мої оцінки</button>

            {isSuperAdmin && <button className={css.CabinetMenuButtons} onClick={allPlaces}>Всі заклади</button>}
            {isSuperAdmin && <button className={css.CabinetMenuButtons} onClick={allUsers}>Всі користувачі</button>}
            {isSuperAdmin && <button className={css.CabinetMenuButtons} onClick={allComments}>Всі коментарі</button>}
            {isSuperAdmin && <button className={css.CabinetMenuButtons} onClick={allNews}>Всі новини</button>}
            {isSuperAdmin && <button className={css.CabinetMenuButtons} onClick={allTypes}>Всі типи закладів</button>}
            {isSuperAdmin && <button className={css.CabinetMenuButtons} onClick={notActivated}>Всі не активовані заклади</button>}
            {isSuperAdmin && <button className={css.CabinetMenuButtons} onClick={allFeatures}>Всі особливості закладів</button>}
            {isSuperAdmin && <button className={css.CabinetMenuButtons} onClick={allPiyachoks}>Всі пиячки</button>}
            {isSuperAdmin && <button className={css.CabinetMenuButtons} onClick={allTops}>Всі топ категорії</button>}


        </div>
    );
};

export {CabinetMenu};