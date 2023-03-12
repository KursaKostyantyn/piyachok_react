import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {typeActions} from "../../redux";

const Filters = () => {
    const {register, handleSubmit, setValue} = useForm();
    const dispatch = useDispatch();
    const {types} = useSelector(state => state.types);

    useEffect(() => {
        dispatch(typeActions.findAllTypes({page: 1}));
    }, [dispatch])

    const submit=(data)=>{
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <h4>Середній рейтинг</h4>
                    Більше <input type={"number"} max={5} placeholder={"рейтинг"} {...register("rating")}/>
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