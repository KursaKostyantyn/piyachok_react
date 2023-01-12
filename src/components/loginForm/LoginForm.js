import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {authActions} from "../../redux";
import {authService} from "../../services";


const LoginForm = () => {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = async (data) => {
        const {error} = await dispatch(authActions.login({user: data}));
        if(!error){
            navigate("/myCabinet/profile")
        }
    }

    authService.deleteTokens();

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input type={"text"} placeholder={"login"} {...register("login")}/>
                <input type={"password"} placeholder={"password"} {...register("password")}/>
                <input type={"email"} placeholder={"email"} {...register("email")}/>
                <button>Авторизуватись</button>
            </form>
        </div>
    );
};

export {LoginForm};