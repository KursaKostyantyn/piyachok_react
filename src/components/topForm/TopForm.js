import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {topActions} from "../../redux";

const TopForm = () => {
    const {register, handleSubmit, reset} = useForm();
    const {errors} = useSelector(state => state.tops);

    const dispatch = useDispatch();


    const submit = async (data) => {
        await dispatch(topActions.saveTop({top: data}));
        console.log(errors)
    }


    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <h4>Назва категорії</h4>
                <input type={'text'} placeholder={'назва категорії'} {...register('name')}/> <br/>
                {errors && <div>{errors.msg}<br/></div>}
                <button>Створити категорію</button>

            </form>
        </div>
    );
};

export {TopForm};