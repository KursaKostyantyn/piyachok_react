import {useForm} from "react-hook-form";
import {useEffect} from "react";

import css from './UserFullInformation.module.css'
import {useSelector} from "react-redux";

const UserFullInformation = ({user}) => {
    const {currentUser} = useSelector(state => state.users);
    const {reset, setValue, handleSubmit, register} = useForm();

    const {login, firstName, lastName, birthDate, email, role, creationDate, isActivated, isBlocked, places} = currentUser;

    useEffect(() => {
        setValue('login', login)
        setValue('firstName', firstName)
        setValue('lastName', lastName)
        setValue('birthDate', birthDate)
        setValue('email', email)
        setValue('role', role.split('_')[1])
        setValue('creationDate', creationDate)
    }, [])

    return (
        <div>
            <form className={css.FormWrap}>
                <div>
                    <input type={'text'} placeholder={'login'} {...register('login')}/> login
                </div>
                <div>
                    <input type={'text'} placeholder={'firstName'} {...register('firstName')}/> firstName
                </div>
                <div>
                    <input type={'text'} placeholder={'lastName'} {...register('lastName')}/> lastName
                </div>
                <div>
                    <input type={'text'} placeholder={'birthDate'} {...register('birthDate')}/> birthDate
                </div>
                <div>
                    <input type={'text'} placeholder={'email'} {...register('email')}/> email
                </div>
                <div>
                    <input type={'text'} placeholder={''} {...register('role')}/> role
                </div>
                <div>
                     <input type={'text'} placeholder={'creationDate'} {...register('creationDate')}/> creationDate:
                </div>


            </form>

        </div>
    );
};

export {UserFullInformation};