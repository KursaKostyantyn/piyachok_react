import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";

import {featureActions, placeActions, typeActions, userActions} from "../../redux";
import css from './PlaceForm.module.css'


const PlaceForm = () => {
    const params = useParams();
    const [placeId, setPlaceId] = useState(null);
    const {reset, handleSubmit, setError: {errors}, setValue, register,} = useForm();
    const dispatch = useDispatch();
    const {currentPlace} = useSelector(state => state.places);
    const {currentUser, users} = useSelector(state => state.users);
    const {authorizedUser} = useSelector(state => state.auth);
    const {types} = useSelector(state => state.types);
    const {features} = useSelector(state => state.features);
    const [isDisabledCheckBoxActivated, setIsDisabledCheckBoxActivated] = useState('');
    const location = useLocation();


    useEffect(() => {
        dispatch(typeActions.findAllTypes({page: 1}))
        dispatch(featureActions.findAllFeatures({page: 1}))

    }, [dispatch])

    useEffect(() => {
        if (params.placeId !== undefined) {
            dispatch(placeActions.findPlaceById({id: params.placeId}))
            dispatch(userActions.findAllUsers({page: 1}))
        }
    }, [dispatch])

    useEffect(() => {
        if (authorizedUser !== null && authorizedUser.role.includes('SUPERADMIN')) {
            dispatch(userActions.findAllUsers({page: 1}))
        }
    }, [])


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
            for (let i = 0; i < currentPlace.features.length; i++) {
                setValue(`features.${currentPlace.features[i].name}`, true)
            }
        }
        if (location.pathname.includes('createPlace')) {
            dispatch(placeActions.setCurrentPlace(null));
            reset();
        }
    }, [currentPlace, types])

    useEffect(() => {
        if (currentPlace != null) {
            dispatch(userActions.findUserById({userId: currentPlace.userId}))
        }
    }, [currentPlace])

    useEffect(() => {
        if (authorizedUser != null) {
            setValue("userId", authorizedUser.id)
        }
    }, [authorizedUser])


    const submit = async (data) => {
        let typesForSending = [];
        let featuresForSending = []
        for (let name in data.types) {
            if (data.types[name] !== false) {
                typesForSending.push(name);
            }
        }
        for (let name in data.features) {
            if (data.features[name] !== false) {
                featuresForSending.push(name)
            }
        }
        data.types = typesForSending;
        data.features = featuresForSending;
        if (currentPlace !== null) {
            await dispatch(placeActions.updatePlaceById({placeId: currentPlace.id, place: data}));
        } else {
            await dispatch(placeActions.savePLace({place: data, userId: authorizedUser.id}));

        }

    }


    return (
        <div className={css.Wrap}>
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <h4>?????????? ??????????????</h4>
                    <input type={'text'} required={true} placeholder={'??????????'} {...register('name',)}/>
                </div>
                <div>
                    <h3>???????????? ??????????????:</h3>
                    <h4>??????????</h4>
                    <input type={'text'} required={true} placeholder={'??????????'} {...register('address.city')}/>
                    <div>
                        <h4>????????????</h4>
                        <input type={'text'} required={true} placeholder={'????????????'} {...register('address.street')}/>
                    </div>
                    <div>
                        <h4>?????????? ????????</h4>
                        <input type={'number'} required={true} placeholder={'??????????'} {...register('address.number')}/>
                    </div>
                </div>
                <div className={css.ScheduleSection}>
                    <h3>???????????? ????????????:</h3>
                    <h4>??????????????????</h4>
                    <input type={'time'} required={true}
                           placeholder={'??????????????????'} {...register('workSchedule.mondayStart')}/> - <input

                    type={'time'} required={true}
                    placeholder={'??????????????????'} {...register('workSchedule.mondayEnd')}/>
                    <br/>
                    <h4>????????????????</h4>
                    <input type={'time'} required={true}
                           placeholder={'????????????????'} {...register('workSchedule.tuesdayStart')}/> - <input

                    type={'time'} required={true}
                    placeholder={'????????????????'} {...register('workSchedule.tuesdayEnd')}/>
                    <br/>
                    <h4>????????????</h4>
                    <input type={'time'} required={true}
                           placeholder={'????????????'} {...register('workSchedule.wednesdayStart')}/> - <input

                    type={'time'} required={true}
                    placeholder={'????????????'} {...register('workSchedule.wednesdayEnd')}/>
                    <br/>
                    <h4>??????????????</h4>
                    <input type={'time'} required={true}
                           placeholder={'??????????????'} {...register('workSchedule.thursdayStart')}/> - <input

                    type={'time'} required={true}
                    placeholder={'??????????????'} {...register('workSchedule.thursdayEnd')}/>
                    <br/>
                    <h4>??'????????????</h4>
                    <input type={'time'} required={true}
                           placeholder={'??\'????????????'} {...register('workSchedule.fridayStart')}/> - <input

                    type={'time'} required={true}
                    placeholder={'??\'????????????'} {...register('workSchedule.fridayEnd')}/>
                    <br/>
                    <h4>????????????</h4>
                    <input type={'time'} required={true}
                           placeholder={'????????????'} {...register('workSchedule.saturdayStart')}/> - <input

                    type={'time'}
                    required={true}
                    placeholder={'????????????'} {...register('workSchedule.saturdayEnd')}/>
                    <br/>
                    <h4>????????????</h4>
                    <input type={'time'} required={true}
                           placeholder={'????????????'} {...register('workSchedule.sundayStart')}/> - <input

                    type={'time'}
                    required={true}
                    placeholder={'????????????'} {...register('workSchedule.sundayEnd')}/>
                    <br/>
                </div>
                <div>
                    <h4>??????????????</h4>
                    <input type={'tel'} required={true} placeholder={'??????????????'} {...register('contacts.phone')}/>
                </div>
                <div>
                    <h4>???????????????????? ??????????</h4>
                    <input type={'text'} required={true} placeholder={''} {...register('contacts.email')}/>
                </div>
                <div>
                    <h4>????????????????????</h4>
                    <input type={'checkbox'} placeholder={'????????????????????'}
                           disabled={isDisabledCheckBoxActivated} {...register('isActivated')}/>
                </div>
                <div>
                    <h4>???????? ??????????????</h4>
                    <textarea required={true} placeholder={'???????? ??????????????'}
                              className={css.TextArea} {...register('description')}/>
                </div>
                <div>
                    <h4>?????? ??????????????</h4>
                    {types && types.map(type => <span key={type.id}>
                            <input type={'checkbox'}
                                   value={`${type.name}`}  {...register(`types.${type.name}`)}/> - {type.name}
                        </span>
                    )}
                </div>
                <div>
                    <h4>?????????????????????? ??????????????</h4>
                    {features && features.map(feature => <span key={feature.id}>
                        <input type={'checkbox'}
                               value={`${feature.name}`} {...register(`features.${feature.name}`)}/> - {feature.name}
                    </span>)}
                </div>
                <div>
                    <h4>?????????????? ??????????????</h4>
                    <select required={true} {...register('userId')}>
                        {users && users.map(user =>
                            <option key={user.id} value={user.id}>{user.login}</option>)}

                    </select>

                </div>
                <button>???????????????? ????????????</button>
            </form>
        </div>
    );
};

export {PlaceForm};