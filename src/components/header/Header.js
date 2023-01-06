import css from './Header.module.css'
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const login = () => {
        navigate("/login");
    }
    const register = () => {
        navigate("/register")
    }

    return (
        <div className={css.Header}>
            <div className={css.HeaderName}>Пиячок</div>
            <div className={css.ButtonSection}>
                <button className={css.Buttons} onClick={login}>Авторизуватися</button>
                <button className={css.Buttons} onClick={register}>Зареєструватися</button>
            </div>
        </div>
    );
};

export {Header};