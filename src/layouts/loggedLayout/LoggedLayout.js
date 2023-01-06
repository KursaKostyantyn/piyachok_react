import {Header} from "../../components";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

const LoggedLayout = () => {

    const {errors} = useSelector(state => state.users);
    return (
        <div>
            <Header/>
            {errors && JSON.stringify(errors)}
            <Outlet/>
        </div>
    );
};

export {LoggedLayout};
