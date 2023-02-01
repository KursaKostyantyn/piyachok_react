import {useForm} from "react-hook-form";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {userActions} from "../../redux";
import {useNavigate, useSearchParams} from "react-router-dom";

const ResetPasswordForm = () => {

    const {reset, register, handleSubmit} = useForm();
    const [isMatch, setIsMatch] = useState(true);
    const [typeInput, setTypeInput] = useState('password');
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);

    const resetPassword = async (data) => {
        setIsError(false)
        if (data.password === data.repeatPassword) {
            const {error} = await dispatch(userActions.resetPasswordAndSetNew({
                userLogin: searchParams.get('userLogin'),
                resetPasswordToken: searchParams.get('resetPasswordToken'),
                password: data.password
            }));
            setIsMatch(true);
            if (!error) {
                setIsError(true)
                navigate('/login');
            }
            if (error) {
                setIsError(true);
                reset()
            }


        } else {
            setIsMatch(false)
        }

    }

    const showPassword = () => {
        setTypeInput('text')
    }
    const hidePassword = () => {
        setTypeInput('password')
    }


    return (
        <div>
            <form onSubmit={handleSubmit(resetPassword)}>
                <div>
                    <input type={typeInput} onMouseOver={showPassword} onMouseLeave={hidePassword}
                           placeholder={"password"} {...register('password')}/>
                    Введіть новий пароль
                </div>
                <div>
                    <input type={typeInput} onMouseOver={showPassword} onMouseLeave={hidePassword}
                           placeholder={"repeat password"} {...register('repeatPassword')}/>
                    Повторно введіть пароль
                    <div>
                        <button>Оновити пароль</button>
                    </div>
                </div>
            </form>
            {!isMatch && <span>Паролі не співпадають</span>}
            {isError && <span>Упс щось пішло не так</span>}
        </div>
    );
};

export {ResetPasswordForm};