import {User} from "../user/User";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {userActions} from "../../redux";

const Users = () => {
    const dispatch = useDispatch();
    const {users} = useSelector(state => state.users);
    useEffect(() => {
        dispatch(userActions.findAllUsers())
    }, [dispatch])
    return (
        <div>
            {users && users.map(user => <User key={user.id} user={user}/>)}
        </div>
    );
};

export {Users};