import {useForm} from "react-hook-form";
import {useEffect} from "react";

import css from './UserProfile.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {userActions} from "../../redux";
import {authService} from "../../services";

const UserProfile = () => {
    const {currentUser} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const params = useParams();
    const {reset, setValue, handleSubmit, register} = useForm();
    const navigate = useNavigate();

    // const {login, firstName, lastName, birthDate, email, role, creationDate, isActivated, isBlocked, places} = currentUser;


    useEffect(() => {
        dispatch(userActions.findUserById({id: params.userId}))
    }, [dispatch])

    useEffect(() => {

        if (currentUser !== null) {
            setValue('login', currentUser.login)
            setValue('firstName', currentUser.firstName)
            setValue('lastName', currentUser.lastName)
            setValue('birthDate', currentUser.birthDate)
            setValue('email', currentUser.email)
            setValue('role', currentUser.role)
            setValue('creationDate', currentUser.creationDate)
        }

    }, [currentUser])

    const update = (data) => {
        console.log(data);
        dispatch(userActions.updateUserById({id: currentUser.id, user: data}))
    }

    const deleteUser=()=>{
        dispatch(userActions.deleteUserById({id:currentUser.id}))
        authService.deleteTokens();
        navigate('/login')

    }


    return (
        <div>
            <form className={css.FormWrap}>
                <div>
                    <input type={'text'} placeholder={'login'} {...register('login')}/> Логін
                </div>
                <div>
                    <input type={'password'} autoComplete={'new-password'}  placeholder={'password'} {...register('password')}/> Пароль
                </div>
                <div>
                    <input type={'text'} placeholder={'firstName'} {...register('firstName')}/> Ім'я
                </div>
                <div>
                    <input type={'text'} placeholder={'lastName'} {...register('lastName')}/> Прізвище
                </div>
                <div>
                    <input type={'date'} placeholder={'birthDate'} {...register('birthDate')}/> дата народження
                </div>
                <div>
                    <input type={'text'} placeholder={'email'} {...register('email')}/> пошта
                </div>
                <div>
                    <select name={'role'} {...register('role')}>
                        <option value='ROLE_SUPERADMIN'>SUPERADMIN</option>
                        <option value='ROLE_ADMIN'>ADMIN</option>
                        <option value='ROLE_USER'>USER</option>
                    </select>
                </div>
                <div>
                    <input type={'text'} placeholder={'creationDate'} {...register('creationDate')}/> creationDate:
                </div>
                <div>
                    <button onClick={handleSubmit(update)}>Оновити профіль</button>
                </div>
                <div>
                    <button onClick={handleSubmit(deleteUser)}>Видалити профіль</button>
                </div>


            </form>

        </div>
    );
};

export {UserProfile};