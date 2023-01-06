import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {authService} from "../../services";
import {authActions} from "../../redux";


const RegisterForm = () => {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = async (data) => {

        const {error} = await dispatch(authActions.register({user: data}));

        authService.deleteTokens();

        if (!error) {
            navigate('/login')
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input type={"text"} placeholder={"login"} {...register("login")}/>
                <input type={"password"} placeholder={"password"} {...register("password")}/>
                <input type={"email"} placeholder={"email"} {...register("email")}/>
                <button>Зареєструватись</button>
            </form>
        </div>
    );
};

export {RegisterForm};