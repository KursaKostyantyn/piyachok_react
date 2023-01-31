import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {commentsActions} from "../../redux";
import {Comment} from "../comment/Comment";

const MyComments = () => {
    const {comments} = useSelector(state => state.comments);
    const {authorizedUser} = useSelector(state => state.auth);
    const dispatch = useDispatch();


    useEffect(() => {
        if (authorizedUser != null) {
            dispatch(commentsActions.findCommentsByUserLogin({login: authorizedUser.login}));
        }

    }, [authorizedUser])


    return (
        <div>
            {comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
        </div>
    );
};

export {MyComments};