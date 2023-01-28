import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import {userActions} from "../../redux";

const User = ({user}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const {id, login, firstName, lastName, birthDate, email, role, creationDate, isActivated, isBlocked, places} = user;

    const currentUser = () => {
        dispatch(userActions.setCurrentUser(user));
        navigate(`${id}`)
    }
    return (
        <div>
            <div>Логін: {login}</div>
            <div>Ім'я: {firstName}</div>
            <div>Прізвище: {lastName}</div>
            <div>Роль: {role.split('_')[1]}</div>
            <button onClick={currentUser}>Деталі</button>
        </div>
    );
};

export {User};