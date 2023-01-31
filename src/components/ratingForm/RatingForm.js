import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {ratingActions} from "../../redux";

const RatingForm = () => {
    const {register, handleSubmit} = useForm();
    const params = useParams();
    const {authorizedUser} = useSelector(state => state.auth);
    const [isSelected, setIsSelected] = useState(true);
    const dispatch = useDispatch();
    const [userRating, setUserRating] = useState('3');
    const {currentRating} = useSelector(state => state.ratings);


    useEffect(() => {
        if (authorizedUser !== null && params.placeId !== undefined) {
            dispatch(ratingActions.findRatingByPLaceIdAndUserLogin({
                placeId: params.placeId,
                userLogin: authorizedUser.login
            }))
        }
    }, [authorizedUser])

    useEffect(() => {
        if (currentRating !== null) {
            setUserRating(`${currentRating.rating}`)
        }
    }, [currentRating])

    const saveRating = async (data) => {
        if (data.rating === null) {
            setIsSelected(false);
        } else {
            setIsSelected(true)
        }
        if (data.rating !== null && authorizedUser !== null) {
            data.placeId = params.placeId;
            data.userLogin = authorizedUser.login;
            await dispatch(ratingActions.saveRating({rating: data}));
        }

    }

    const updateRating = async (data) => {
        data.placeId = params.placeId;
        data.userLogin = authorizedUser.login;
        await dispatch(ratingActions.updateRating({rating: data}))
    }

    const handleChange = e => {
        if (currentRating !== null) {
            setUserRating(e.target.value)
        }
    }


    return (

        <div>
            {currentRating && <div>id: {currentRating.id}</div>}
            {authorizedUser && <div>
                Ваша оцінка
                <form>
                    <label><input type='radio' id='ratingChoice1' value={1} onClick={handleChange}
                                  checked={userRating === '1'} {...register('rating')}/>1</label>
                    <label><input type='radio' id='ratingChoice2' value={2} onClick={handleChange}
                                  checked={userRating === '2'} {...register('rating')}/>2</label>
                    <label><input type='radio' id='ratingChoice3' value={3} onClick={handleChange}
                                  checked={userRating === '3'} {...register('rating')}/>3</label>
                    <label><input type='radio' id='ratingChoice4' value={4} onClick={handleChange}
                                  checked={userRating === '4'} {...register('rating')}/>4</label>
                    <label><input type='radio' id='ratingChoice5' value={5} onClick={handleChange}
                                  checked={userRating === '5'} {...register('rating')}/>5</label>
                    {currentRating ?
                        <div>
                            <button onClick={handleSubmit(updateRating)}>Змінити оцінку</button>
                        </div> :
                        <div>
                            <button onClick={handleSubmit(saveRating)}>Поставити оцінку</button>
                        </div>
                    }
                    {!isSelected && <div>Оберіть оцінку</div>}
                </form>
            </div>


            }

        </div>


    )
        ;
};

export {RatingForm};