import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {commentsActions} from "../../redux";
import {Comment} from "../comment/Comment";


const PlaceComments = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {comments, previousPage, nextPage, amountOfPages, currentPage} = useSelector(state => state.comments);
    const [query, setQuery] = useSearchParams({page: '1'});
    const [newUp, setNewUp] = useState(true);
    const navigate = useNavigate();

    const {authorizedUser} = useSelector(state => state.auth);

    useEffect(() => {
        if (params.placeId) {
            dispatch(commentsActions.findCommentsByPlaceId({
                placeId: params.placeId,
                page: query.get('page'),
                old: newUp
            }))
        }
    }, [newUp, query,params.placeId])

    const newest = () => {
        setNewUp(!newUp);
    }

    const goToPreviousPage = () => {
        const page = +query.get('page') - 1;
        setQuery({page: `${page}`})
    };

    const goToNextPage = () => {
        const page = +query.get('page') + 1;
        setQuery({page: `${page}`})
    };

    const addComment = () => {
        navigate('addComment')
    }

    return (
        <div>
            <div>
                <button disabled={previousPage === 0} onClick={goToPreviousPage}>Попередня сторінка</button>
                <span>Сторінка {currentPage} з {amountOfPages} </span>
                <button disabled={nextPage === 0} onClick={goToNextPage}>Наступна сторінка</button>
            </div>
            <button onClick={newest}>{!newUp ? <span>Спочатку нові коментарі</span> :
                <span>Спочатку старі коментарі</span>}</button>
            {authorizedUser && <button onClick={addComment}>Додати коментар</button>}
            {comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
        </div>
    );
};

export {PlaceComments};