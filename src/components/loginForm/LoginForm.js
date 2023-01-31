import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {authActions} from "../../redux";
import {authService} from "../../services";


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
            <form onSubmit={handleSubmit(submit)}>
                <input type={"text"} placeholder={"login"} {...register("login", {
                    required: true,
                    minLength: 3,
                    maxLength: 20
                })}/>
                <input type={"password"} placeholder={"password"} {...register("password", {
                    required: true,
                    minLength: 4,
                    maxLength: 20
                })}/>
                <input type={"email"} placeholder={"email"} {...register("email")}/>
                {errors.login || errors.password ? <span>The login or password you entered is incorrect.</span> : null}
                <button>Авторизуватись</button>
                {errors && <span>{errors.msg}</span>}
            </form>
        </div>
    );
};

export {LoginForm};