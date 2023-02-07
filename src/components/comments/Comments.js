import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {commentsActions} from "../../redux";
import {Comment} from "../comment/Comment";
import {useLocation, useSearchParams} from "react-router-dom";

const Comments = () => {
    const dispatch = useDispatch();
    const {comments, currentPage, amountOfPages, nextPage, previousPage} = useSelector(state => state.comments);
    const {authorizedUser} = useSelector(state => state.auth);
    const [query, setQuery] = useSearchParams({page: '1', old: 'false'});
    const location = useLocation();


    useEffect(() => {
        if (authorizedUser != null && location.pathname.includes('myComments')) {
            dispatch(commentsActions.findCommentsByUserLogin({
                login: authorizedUser.login,
                page: query.get('page'),
                old: query.get('old')
            }));
        } else {
            dispatch(commentsActions.findAllComments({page: query.get('page'), old: query.get('old')}))
        }

    }, [query, location.pathname, authorizedUser])

    const setOld = () => {
        let old = query.get('old');
        if (old === 'true') {
            setQuery({old: 'false'})
        }
        if (old === 'false') {
            setQuery({old: 'true'})
        }
    }

    const goToPreviousPage = () => {
        const page = +query.get('page') - 1;
        const old = query.get('old')
        setQuery({page: `${page}`, old: `${old}`})
    }

    const goToNextPage = () => {
        const page = +query.get('page') + 1;
        const old = query.get('old')
        setQuery({page: `${page}`, old: `${old}`})
    }

    return (
        <div>
            <div>
                {query.get('old') === 'false' ? <button onClick={setOld}>Спочатку старі коментарі</button> :
                    <button onClick={setOld}>Спочатку нові коментарі</button>}
            </div>


            <button onClick={goToPreviousPage} disabled={previousPage === 0}>Попередня сторінка</button>
            <span>{currentPage} з {amountOfPages}</span>
            <button onClick={goToNextPage} disabled={nextPage === 0}>Наступна сторінка</button>
            {comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
        </div>
    );
};

export {Comments};