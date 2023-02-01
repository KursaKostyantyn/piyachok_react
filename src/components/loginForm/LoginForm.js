import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import {authActions} from "../../redux";
import {authService} from "../../services";
import css from './LoginForm.module.css'


const LoginForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submit = async (data) => {
        const {error} = await dispatch(authActions.login({user: data}));
        if (!error) {
            navigate("/myCabinet/profile")
        }
    }

    authService.deleteTokens();


    return (
        <div>
            <form className={css.FormSection} onSubmit={handleSubmit(submit)}>
                <div>
                    <input type={"text"} placeholder={"login"} {...register("login", {
                        required: true,
                        minLength: 3,
                        maxLength: 20
                    })}/>
                </div>

                <div>
                    <input type={"password"} placeholder={"password"} {...register("password", {
                        required: true,
                        minLength: 4,
                        maxLength: 20
                    })}/>
                </div>
                <div>
                    <button>Авторизуватись</button>
                    <br/>
                    <Link to={'/sendResetPasswordToken'}>Забули пароль?</Link>
                </div>
            </form>
            {errors.login || errors.password ? <span>The login or password you entered is incorrect.</span> : null}
            {errors && <span>{errors.msg}</span>}
        </div>
    );
};

export {LoginForm};