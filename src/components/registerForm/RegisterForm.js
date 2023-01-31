import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {authService} from "../../services";
import {authActions} from "../../redux";
import {useEffect, useState} from "react";


const RegisterForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
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
                <input type={"text"} placeholder={"login"} {...register("login",{
                    required:true,
                    minLength: 3,
                    maxLength: 20
                })} />
                <input type={"password"} placeholder={"password"} {...register("password",{
                    required:true,
                    minLength: 4,
                    maxLength: 20
                })}/>
                <input type={"email"} placeholder={"email"} {...register("email",{
                    required:true
                })}/>
                <div>
                    {errors.login && errors.login.type === "minLength" &&
                        <span>Login must be equal or longer than 3 symbols<br/></span>}
                    {errors.login && errors.login.type === "required" && <span>Login can't be empty<br/></span>}
                    {errors.login && errors.login.type === "maxLength" &&
                        <span>Login must be shorter than 20 symbols<br/></span>}
                    {errors.password && errors.password.type === "minLength" &&
                        <span>Password must be equal or longer than 4 symbols<br/></span>}
                    {errors.password && errors.password.type === "required" && <span>Password can't be empty<br/></span>}
                    {errors.password && errors.password.type === "maxLength" &&
                        <span>Password must be shorter than 20 symbols<br/></span>}
                    {errors.email && <span>Incorrect email</span>}
                </div>
                <button>Зареєструватись</button>
            </form>
        </div>
    );
};

export {RegisterForm};