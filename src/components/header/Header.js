import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {authService} from "../../services";
import {authActions} from "../../redux";
import css from './Header.module.css'

const Header = () => {
    const navigate = useNavigate();
    const {authorizedUser} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [isAuth, setIsAuth] = useState(false);
    const [isCabinet, setIsCabinet] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const location = useLocation();


    useEffect(() => {
        if (location.pathname.includes('myCabinet')) {
            setIsCabinet(true);
        } else {
            setIsCabinet(false)
        }
    }, [location])

    useEffect(() => {
        if (location.pathname.includes('login')) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
        if (location.pathname.includes('register')) {
            setIsRegister(true)
        } else {
            setIsRegister(false)
        }
    }, [location])

    useEffect(() => {
        if (authorizedUser === null) {
            setIsAuth(false);
        } else {
            setIsAuth(true)
        }

    }, [authorizedUser])

    const login = async () => {
        await dispatch(authActions.setErrors(null))
        navigate("/login");
    }
    const register = async () => {
        await dispatch(authActions.setErrors(null))
        navigate("/register")
    }

    const exit = () => {
        authService.deleteTokens();
        dispatch(authActions.setAuthorizedUser(null));
        navigate('/login')
    }

    const myCabinet = () => {
        navigate('/myCabinet')
    }

    const goToMainPage = () => {
        navigate('/')
    }

    return (
        <div className={css.Header}>
            <div className={css.HeaderName}>Пиячок</div>
            <div className={css.ButtonSection}>
                {isAuth ?
                    <div>
                        {!isCabinet ? <button className={css.Buttons} onClick={myCabinet}>Мій кабінет</button> :
                             <button onClick={goToMainPage}>Головна сторінка</button> }
                        <button className={css.Buttons} onClick={exit}>Вихід</button>
                    </div>

                    :
                    <div>
                        {!isLogin && <button className={css.Buttons} onClick={login}>Авторизуватися</button>}
                        {isRegister ? <button onClick={goToMainPage}>Головна сторінка</button> :
                            <button className={css.Buttons} onClick={register}>Зареєструватися</button>}
                    </div>
                }
            </div>
        </div>
    );
};

export {Header};