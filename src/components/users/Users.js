import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

import {userActions} from "../../redux";
import {UserShortInformation} from "../userShortInformation/UserShortInformation";


const Users = () => {
    const dispatch = useDispatch();
    const {users, currentPage, previousPage, nextPage, amountOfPages} = useSelector(state => state.users);
    const [query, setQuery] = useSearchParams({page: '1'});

    useEffect(() => {
        dispatch(userActions.findAllUsers({page: query.get('page')}))
    }, [query])

    const goToNextPage = async () => {
        const page = +query.get('page') + 1;
        setQuery({page: `${page}`})
    }

    const goToPreviousPage = async () => {
        const page = +query.get('page') - 1;
        setQuery({page: `${page}`})
    }


    return (
        <div>
            <button disabled={previousPage === 0} onClick={goToPreviousPage}>Попередня сторінка</button>
            <span>{currentPage} з {amountOfPages}</span>
            <button disabled={nextPage === 0} onClick={goToNextPage}>Наступна сторінка{nextPage}</button>


            {users && users.map(user => <UserShortInformation key={user.id} user={user}/>)}
        </div>
    );
};

export {Users};