import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

import {userActions} from "../../redux";

const UserFullInformation = () => {
    const {currentUser} = useSelector(state => state.users);
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userActions.findUserById({userId: params.userId}))
    }, [dispatch,params.userId])

    const updateProfile = () => {
        navigate('update')
    }

    return (
        <div>{
            currentUser && <div>
                <div>Логін: {currentUser.login}</div>
                <div>Ім'я: {currentUser.firstName}</div>
                <div>Прізвище: {currentUser.lastName}</div>
                <div>Дата народження: {currentUser.birthDate}</div>
                <div>Пошта: {currentUser.email}</div>
                <div>Роль: {currentUser.role.split('_')[1]}</div>
                <div>Дата реєстрації: {currentUser.creationDate}</div>
                <button onClick={updateProfile}>Редагувати профіль</button>

            </div>
        }
        </div>
    );
};

export {UserFullInformation};