import {useNavigate} from "react-router-dom";

const UserShortInformation = ({user}) => {
    const navigate = useNavigate();

    const {id, login, firstName, lastName, role} = user;

    const currentUser = () => {
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

export {UserShortInformation};