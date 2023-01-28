import {User, UserProfile} from "../../components";
import {useSelector} from "react-redux";

const UserProfilePage = () => {
    const {authorizedUser} = useSelector(state => state.auth);

    return (
        <div>
            {authorizedUser && <User user={authorizedUser}/>}
        </div>
    );
};

export {UserProfilePage};