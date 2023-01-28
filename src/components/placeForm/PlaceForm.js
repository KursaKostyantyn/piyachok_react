import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";

import {placeActions, typeActions} from "../../redux";
import css from './PlaceForm.module.css'


const PlaceForm = () => {
    const params = useParams();
    const [placeId, setPlaceId] = useState(null);
    const {reset, handleSubmit, setError: {errors}, setValue, register,} = useForm();
    const dispatch = useDispatch();
    const {currentPlace} = useSelector(state => state.places);
    const {authorizedUser} = useSelector(state => state.auth);
    const {types} = useSelector(state => state.types);
    const [isDisabledCheckBoxActivated, setIsDisabledCheckBoxActivated] = useState('');
    const location = useLocation();


    useEffect(() => {
        dispatch(typeActions.findAllTypes())
    }, [dispatch])

    useEffect(() => {
        if (params.placeId !== undefined) {
            dispatch(placeActions.findPlaceById({id:params.placeId}))
        }
    }, [dispatch])


    useEffect(() => {
        if (currentPlace !== null && types !== null) {
            setIsDisabledCheckBoxActivated('disabled')
            setValue('name', currentPlace.name)
            setValue('address.city', currentPlace.address.city)
            setValue('address.street', currentPlace.address.street)
            setValue('address.number', currentPlace.address.number)
            setValue('workSchedule.mondayStart', currentPlace.workSchedule.mondayStart)
            setValue('workSchedule.mondayEnd', currentPlace.workSchedule.mondayEnd)
            setValue('workSchedule.tuesdayStart', currentPlace.workSchedule.tuesdayStart)
            setValue('workSchedule.tuesdayEnd', currentPlace.workSchedule.tuesdayEnd)
            setValue('workSchedule.wednesdayStart', currentPlace.workSchedule.wednesdayStart)
            setValue('workSchedule.wednesdayEnd', currentPlace.workSchedule.wednesdayEnd)
            setValue('workSchedule.thursdayStart', currentPlace.workSchedule.thursdayStart)
            setValue('workSchedule.thursdayEnd', currentPlace.workSchedule.thursdayEnd)
            setValue('workSchedule.fridayStart', currentPlace.workSchedule.fridayStart)
            setValue('workSchedule.fridayEnd', currentPlace.workSchedule.fridayEnd)
            setValue('workSchedule.saturdayStart', currentPlace.workSchedule.saturdayStart)
            setValue('workSchedule.saturdayEnd', currentPlace.workSchedule.saturdayEnd)
            setValue('workSchedule.sundayStart', currentPlace.workSchedule.sundayStart)
            setValue('workSchedule.sundayEnd', currentPlace.workSchedule.sundayEnd)
            setValue('contacts.phone', currentPlace.contacts.phone)
            setValue('contacts.email', currentPlace.contacts.email)
            setValue('isActivated', currentPlace.activated)
            setValue('description', currentPlace.description)
            for (let i = 0; i < currentPlace.types.length; i++) {
                setValue(`types.${currentPlace.types[i].name}`, true)
            }
        }
        if (location.pathname.includes('createPlace')) {
            dispatch(placeActions.setCurrentPlace(null));
            reset();
        }
    }, [currentPlace, types])

    const submit = async (data) => {
        let typesForSending = [];
        for (let name in data.types) {
            if (data.types[name] !== false) {
                typesForSending.push(name);
            }
        }
        data.types = typesForSending;
        await dispatch(placeActions.savePLace({place: data, userId: authorizedUser.id}));
        reset();
    }


    return (
        <div className={css.Wrap}>
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <h4>Назва закладу</h4>
                    <input type={'text'} placeholder={'Назва'} {...register('name')}/>
                </div>
                <div>
                    <h3>Адреса закладу:</h3>
                    <h4>Город</h4>
                    <input type={'text'} placeholder={'город'} {...register('address.city')}/>
                    <div>
                        <h4>Вулиця</h4>
                        <input type={'text'} placeholder={'Вулиця'} {...register('address.street')}/>
                    </div>
                    <div>
                        <h4>Номер дому</h4>
                        <input type={'number'} placeholder={'Номер'} {...register('address.number')}/>
                    </div>
                </div>
                <div className={css.ScheduleSection}>
                    <h3>График роботи:</h3>
                    <h4>Понеділок</h4>
                    <input type={'time'}
                           placeholder={'понеділок'} {...register('workSchedule.mondayStart')}/> - <input
                    type={'time'} placeholder={'понеділок'} {...register('workSchedule.mondayEnd')}/> <br/>
                    <h4>Вівторок</h4>
                    <input type={'time'}
                           placeholder={'вівторок'} {...register('workSchedule.tuesdayStart')}/> - <input
                    type={'time'} placeholder={'вівторок'} {...register('workSchedule.tuesdayEnd')}/> <br/>
                    <h4>Середа</h4>
                    <input type={'time'}
                           placeholder={'середа'} {...register('workSchedule.wednesdayStart')}/> - <input
                    type={'time'} placeholder={'середа'} {...register('workSchedule.wednesdayEnd')}/> <br/>
                    <h4>Четверг</h4>
                    <input type={'time'}
                           placeholder={'четверг'} {...register('workSchedule.thursdayStart')}/> - <input
                    type={'time'} placeholder={'четверг'} {...register('workSchedule.thursdayEnd')}/> <br/>
                    <h4>П'ятниця</h4>
                    <input type={'time'}
                           placeholder={'п\'ятниця'} {...register('workSchedule.fridayStart')}/> - <input
                    type={'time'} placeholder={'п\'ятниця'} {...register('workSchedule.fridayEnd')}/> <br/>
                    <h4>Субота</h4>
                    <input type={'time'}
                           placeholder={'субота'} {...register('workSchedule.saturdayStart')}/> - <input
                    type={'time'} placeholder={'субота'} {...register('workSchedule.saturdayEnd')}/> <br/>
                    <h4>Неділя</h4>
                    <input type={'time'}
                           placeholder={'неділя'} {...register('workSchedule.sundayStart')}/> - <input
                    type={'time'} placeholder={'неділя'} {...register('workSchedule.sundayEnd')}/> <br/>
                </div>
                <div>
                    <h4>Телефон</h4>
                    <input type={'tel'} placeholder={'Телефон'} {...register('contacts.phone')}/>
                </div>
                <div>
                    <h4>Електронна пошта</h4>
                    <input type={'text'} placeholder={''} {...register('contacts.email')}/>
                </div>
                <div>
                    <h4>Активовано</h4>
                    <input type={'checkbox'} placeholder={'Активовано'}
                           disabled={isDisabledCheckBoxActivated} {...register('isActivated')}/>
                </div>
                <div>
                    <h4>Опис закладу</h4>
                    <textarea placeholder={'Опис закладу'} className={css.TextArea} {...register('description')}/>
                </div>
                <div>
                    <h4>Тип закладу</h4>
                    {types && types.map(type => <div key={type.id}>
                            <input type={'checkbox'}
                                   value={`${type.name}`}  {...register(`types.${type.name}`)}/> - {type.name}
                        </div>
                    )}
                </div>
                <button>Зберегти заклад</button>
            </form>
        </div>
    );
};

export {PlaceForm};