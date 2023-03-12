import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import {userActions} from "../../redux";
import css from './UserFullInformation.module.css'
import {useForm} from "react-hook-form";


const UserFullInformation = () => {
    const {currentUser} = useSelector(state => state.users);
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const [errorMsg, setErrorMsg] = useState(false);
    const [src, setSrc] = useState('http://via.placeholder.com/150x150?text=No+Photo');


    useEffect(() => {
        dispatch(userActions.findUserById({userId: params.userId}))
    }, [dispatch, params.userId])

    const updateProfile = () => {
        navigate('update')
    }

    useEffect(() => {
        if (currentUser != null && currentUser.photo != null) {
            setSrc(`http://localhost:8080/users/userPhoto/${currentUser.photo}`)
        } else {
            setSrc('http://via.placeholder.com/150x150?text=No+Photo')
        }

    }, [dispatch, currentUser])



    const onSubmit = async (data) => {
        if (data.file.length !== 0) {
            const formData = new FormData;
            formData.append('photo', data.file[0])
            formData.append('login', currentUser.login)
            await dispatch(userActions.addPhotoToUserByLogin({formData: formData}))
            await dispatch(userActions.findUserById({userId: params.userId}))
            setErrorMsg(false)
        } else {
            setErrorMsg(true)
        }


    }
    return (
        <div>{
            currentUser && <div className={css.UserFullInformationSection}>
                <div className={css.UserPhotoSection}>
                    <div>
                        <img className={css.ImgSettings} src={src} alt={"user"}/>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type={'file'} accept='image/jpeg, image/png' {...register('file')}/><br/>
                        {!currentUser.photo ? <button>Додати фото</button> : <button>Змінити фото</button>}
                    </form>
                    {errorMsg && <span>Оберіть фото</span>}

                </div>
                <div>
                    <div>Логін: {currentUser.login}</div>
                    <div>Ім'я: {currentUser.firstName}</div>
                    <div>Прізвище: {currentUser.lastName}</div>
                    <div>Дата народження: {currentUser.birthDate}</div>
                    <div>Пошта: {currentUser.email}</div>
                    <div>Роль: {currentUser.role.split('_')[1]}</div>
                    <div>Дата реєстрації: {currentUser.creationDate}</div>
                    <button onClick={updateProfile}>Редагувати профіль</button>
                </div>


            </div>
        }
        </div>
    );
};

export {UserFullInformation};