import {useForm} from "react-hook-form";

const TypeCheckBox = ({type}) => {
    const {register} = useForm();


    return (
        <div>
            <input type={'checkbox'} value={`${type.name}`} {...register(`type.${type.name}`)}/> - {type.name}
        </div>
    );
};

export {TypeCheckBox};
