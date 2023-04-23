import {useForm} from "react-hook-form";
import css from './PiyachokForm.module.css'
import {piyachokActions} from "../../redux";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";

const PiyachokForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const addPiyachok = async (data) => {
        data.placeId=params.placeId;
        data.date=data.date.split("T")[0]+" "+ data.date.split("T")[1]
        console.log(data)
        await dispatch(piyachokActions.savePiyachok({piyachok:data}));
        const pathArr = location.pathname.split('/')
        const replaceValue = pathArr[pathArr.length - 1]
        navigate(location.pathname.replace(replaceValue, 'news_').split('_')[0])
    }


    return (
        <div>
            <h2>Оформлення замовлення</h2>
            <form onSubmit={handleSubmit(addPiyachok)}>
                <h4>Запланована дата </h4>
                <input required type={"datetime-local"} {...register("date")}/> <br/>
                <h4>Опис заходу</h4>
                <textarea required className={css.MeetingDescription}
                          placeholder={"опис зустрічі"} {...register("meetingDescription")}/><br/>
                <h4>Напишіть мені</h4>
                <input required type={"email"} placeholder={"email"} {...register("writeToMe")}/><br/>
                <h4>Кількість гостей</h4>
                <input required type={"number"} placeholder={"кількість гостей"} {...register("amountOfGuests")}/><br/>
                <h4>Запланові витрати</h4>
                <input required type={"number"} placeholder={"запланові витрати"} {...register("desireExpenses")}/><br/>
                <button>відправити</button>
            </form>
        </div>
    );
};

export {PiyachokForm};