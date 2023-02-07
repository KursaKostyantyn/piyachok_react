import {useSelector} from "react-redux";

import {UserShortInformation} from "../../components";

const UserProfilePage = () => {
    const {authorizedUser} = useSelector(state => state.auth);

    return (
        <div>
            {authorizedUser && <UserShortInformation user={authorizedUser}/>}
        </div>
    );
};

export {UserProfilePage};