import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

import {newsAction, placeActions} from "../../redux";
import css from './NewsForm.module.css'

const NewsForm = () => {
    const {currentNews} = useSelector(state => state.news);
    const {currentPlace} = useSelector(state => state.places);
    const {authorizedUser} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const {reset, register, handleSubmit, setValue} = useForm();
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if (location.pathname.includes('update')) {
            dispatch(newsAction.findNewsById({id: params.newsId}))
        }
    }, [])

    useEffect(() => {
        if (currentNews !== null) {
            setValue('category', currentNews.category)
            setValue('place', currentNews.placeName)
            setValue('user', currentNews.userLogin)
            setValue('text', currentNews.text)
            setValue('isPaid', currentNews.paid)
        }
    }, [currentNews])

    useEffect(() => {
        if (params.placeId !== undefined) {
            dispatch(placeActions.findPlaceById({id: params.placeId}))
        }
    }, [dispatch])

    useEffect(() => {
        if (currentPlace !== null) {
            setValue('place', currentPlace.name)
        }
    }, [currentPlace])

    useEffect(() => {
        if (authorizedUser !== null) {
            setValue('user', authorizedUser.login)
        }
    })

    const updateNews = async (data) => {
        await dispatch(newsAction.updateNewsById({id: currentNews.id, news: data}));
        navigate(location.pathname.replace('update', ''))
    }

    const createNews = async (data) => {
        await dispatch(newsAction.saveNews({news: data, placeId: params.placeId, login: authorizedUser.login}));
        await dispatch(placeActions.findPlaceById({id:params.placeId}))
        navigate(location.pathname.replace(`/addNews`, ''))
    }

    return (
        <div>
            <form>
                <div>
                    <h4>Категорія</h4>
                    <select name={'category'} {...register('category')}>
                        <option value='MAIN'>Main</option>
                        <option value='PROMOTION'>Promotion</option>
                        <option value='EVENT'>Event</option>
                    </select>
                </div>
                <div>
                    <h4>Назва закладу</h4>
                    <input type='search' disabled={true} placeholder='Назва закладу' {...register('place')}/>
                </div>
                <div>
                    <h4>Користувач</h4>
                    <input type='text' disabled={true} placeholder='Користувач' {...register('user')}/>
                </div>
                <div>
                    <h4>Новина</h4>
                    <textarea className={css.TextAreaStyle} placeholder='Новина' {...register('text')}/>
                </div>
                <div>
                    <h4>Сплачено</h4>
                    <input type='checkbox' disabled={true} placeholder='Сплачено' {...register('isPaid')}/>
                </div>
                {currentNews ? <button onClick={handleSubmit(updateNews)}>Оновити новину</button> :
                    <button onClick={handleSubmit(createNews)}>Створити новину</button>}

            </form>
        </div>
    );
};

export {NewsForm};