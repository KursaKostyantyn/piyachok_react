import {useForm} from "react-hook-form";
import {useState} from "react";
import {userActions} from "../../redux";
import {useDispatch} from "react-redux";

const SendResetPasswordTokenForm = () => {
    const {register,handleSubmit,reset} = useForm();
    const [isSent,setIsSent] = useState(false);
    const dispatch = useDispatch();

    const sendResetPasswordToken=async (data)=>{

        const {errors} = await dispatch(userActions.sendResetPasswordToken({userLogin:data.userLogin})) ;
        if (!errors){
            setIsSent(true);
        }
    }

    return (
        <div>
            {!isSent ?           <div>
                Скидання паролю через пошту
                <form onSubmit={handleSubmit(sendResetPasswordToken)}>
                    <input type={'text'} placeholder={'login'} {...register('userLogin')}/>
                    <button>Відправити лист</button>
                </form>
            </div>:
                <div>Лист відправлено. Перевірте пошту</div>}


        </div>
    );
};

export {SendResetPasswordTokenForm};