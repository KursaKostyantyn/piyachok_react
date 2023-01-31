import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

import {commentsActions} from "../../redux";
import css from './CommentForm.module.css'
import {commentService} from "../../services";


const CommentForm = () => {
    const {register, handleSubmit, reset, setValue} = useForm();
    const {currentComment} = useSelector(state => state.comments);
    const {authorizedUser} = useSelector(state => state.auth);
    const {currentPlace} = useSelector(state => state.places);
    const dispatch = useDispatch();
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if (location.pathname.includes('updateComment')) {
            dispatch(commentsActions.findCommentById({id: params.myCommentsId}))
        }
    }, [dispatch])

    useEffect(() => {

        if (params.myCommentsId && currentComment !== null) {
            setValue('userLogin', currentComment.userLogin)
            setValue('placeName', currentComment.placeName)
            setValue('text', currentComment.text)
        }

        if (params.placeId && authorizedUser) {
            setValue('userLogin', authorizedUser.login)
            setValue('placeName', currentPlace.name)
        }

    }, [currentComment, currentPlace, authorizedUser])

    const saveComment = async (data) => {
        data.placeId = params.placeId;
        await dispatch(commentsActions.saveComment({comment: data}))
        navigate(location.pathname.replace('addComment', ''))
    }

    const updateComment = async (data) => {
        data.placeId = params.placeId;
        data.id=currentComment.id;
        console.log(data)
        await dispatch(commentsActions.updateComment({comment:data}))
        navigate(location.pathname.replace('updateComment', ''))
    }

    return (
        <div>
            <form>
                <div>
                    <h4>Ім'я користувача</h4>
                    <input type='text' placeholder={'Ім\'я користувача'} disabled={true} {...register('userLogin')}/>
                </div>
                <div>
                    <h4>Назва закладу</h4>
                    <input type='text' placeholder={'Назва закладу'} disabled={true} {...register('placeName')}/>
                </div>
                <div>
                    <h4>Текст</h4>
                    <textarea className={css.TextArea} placeholder={'Текст'} {...register('text')}/>
                </div>
                {currentComment ? <button onClick={handleSubmit(updateComment)}>Оновити коментар</button> :
                    <button onClick={handleSubmit(saveComment)}>Створити коментар</button>}


            </form>
        </div>
    );
};

export {CommentForm};