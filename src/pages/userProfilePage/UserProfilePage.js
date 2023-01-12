import {UserFullInformation} from "../../components";
import {useSelector} from "react-redux";

const UserProfilePage = () => {
    const {authorizedUser} = useSelector(state => state.auth);

    return (
        <div>
            {authorizedUser && <UserFullInformation user={authorizedUser}/>}
        </div>
    );
};

export {UserProfilePage};