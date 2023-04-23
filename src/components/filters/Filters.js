import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {placeActions, typeActions} from "../../redux";
import ccs from './Filters.module.css'

const Filters = () => {
    const {register, handleSubmit, setValue} = useForm();
    const dispatch = useDispatch();
    const {types} = useSelector(state => state.types);

    useEffect(() => {
        dispatch(typeActions.findAllTypes({page: 1}));
    }, [dispatch])

    const submit = async (data) => {
        const {rating, averageCheckFrom, averageCheckTo} = data;
        for (const key in data.types){
            if (data.types[key]===false){
                delete data.types[key]
                }
        }
        const types=Object.keys(data.types).toString();
        console.log(types)

        await dispatch(placeActions.setFilter(data))
        await dispatch(placeActions.filterPLaces({
            rating: rating,
            averageCheckFrom: averageCheckFrom,
            averageCheckTo: averageCheckTo,
            types: types
        }))


    }

    return (
        <div>
            <h3>Фільтри:</h3>
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <h4>Середній рейтинг</h4>
                    Більше: <br/>
                    <input className={ccs.NumberField} type={"number"} max={5} min={0} placeholder={"рейтинг"} {...register("rating")}/>
                </div>
                <div>
                    <h4>Тип закладу</h4>
                    {types && types.map(type => <div key={type.id}>
                            <input type={'checkbox'}
                                   value={`${type.name}`}  {...register(`types.${type.name}`)}/> - {type.name}
                        </div>
                    )}
                </div>
                <div>
                    <h4> Середній чек</h4>
                    Від
                    <input type={"number"} placeholder={"from"} {...register("averageCheckFrom")}/>
                    До
                    <input type={"number"} placeholder={"to"} {...register("averageCheckTo")}/>
                </div>
                <button>Фільтрувати</button>
            </form>
        </div>
    );
};

export {Filters};