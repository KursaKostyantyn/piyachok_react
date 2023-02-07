import {useForm} from "react-hook-form";
import {useEffect} from "react";

import css from './UserForm.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {userActions} from "../../redux";
import {authService} from "../../services";

const UserForm = () => {
    const {currentUser} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const params = useParams();
    const {setValue, handleSubmit, register} = useForm();
    const navigate = useNavigate();

    // const {login, firstName, lastName, birthDate, email, role, creationDate, isActivated, isBlocked, places} = currentUser;


    useEffect(() => {
        dispatch(userActions.findUserById({userId: params.userId}))
    }, [dispatch,params.userId])

    useEffect(() => {

        if (currentUser !== null) {
            setValue('login', currentUser.login)
            setValue('firstName', currentUser.firstName)
            setValue('lastName', currentUser.lastName)
            setValue('birthDate', currentUser.birthDate)
            setValue('email', currentUser.email)
            setValue('role', currentUser.role)
            setValue('creationDate', currentUser.creationDate)
            setValue('activated', currentUser.activated)
        }

    }, [currentUser])

    const update = async (data) => {
        console.log(data);
        await dispatch(userActions.updateUserById({id: currentUser.id, user: data}))
    }

    const deleteUser = async () => {
        await dispatch(userActions.deleteUserById({id: currentUser.id}))
        authService.deleteTokens();
        navigate('/login')

    }


    return (
        <div>
            <form className={css.FormWrap}>
                <div>
                    <h4>Логін</h4>
                    <input type={'text'} disabled={true} placeholder={'login'} {...register('login')}/>
                </div>
                <div>
                    <h4>Пароль</h4>
                    <input type={'password'} autoComplete={'new-password'}
                           placeholder={'password'} {...register('password')}/>
                </div>
                <div>
                    <h4>Ім'я</h4>
                    <input type={'text'} placeholder={'firstName'} {...register('firstName')}/>
                </div>
                <div>
                    <h4>Прізвище</h4>
                    <input type={'text'} placeholder={'lastName'} {...register('lastName')}/>
                </div>
                <div>
                    <h4>Дата народження</h4>
                    <input type={'date'} placeholder={'birthDate'} {...register('birthDate')}/>
                </div>
                <div>
                    <h4>Пошта</h4>
                    <input type={'text'} placeholder={'email'} {...register('email')}/>
                </div>
                <div>
                    <h4>Роль</h4>
                    <select name={'role'} {...register('role')}>
                        <option value='ROLE_SUPERADMIN'>SUPERADMIN</option>
                        <option value='ROLE_ADMIN'>ADMIN</option>
                        <option value='ROLE_USER'>USER</option>
                    </select>
                </div>
                <div>
                    <h4>Дата реєстрації</h4>
                    <input type={'text'} disabled={true} placeholder={'creationDate'} {...register('creationDate')}/>
                </div>
                <div>
                    <h4>Активовано</h4>
                    <input type={'checkbox'} disabled={true} placeholder={'isActivated'} {...register('activated')}/>
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

export {UserForm};