import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {typeActions} from "../../redux";
import {TypeCheckBox} from "../typeCheckBox/TypeCheckBox";

const TypesForCheckBox = () => {
    const dispatch = useDispatch();
    const {types} = useSelector(state => state.types);


    useEffect(()=>{
        dispatch(typeActions.findAllTypes())
    },[dispatch])

    return (
        <div>
            {types.map(type=><TypeCheckBox key={type.id} type={type}/> )}
        </div>
    );
};

export {TypesForCheckBox};