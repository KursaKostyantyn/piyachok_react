import {useForm} from "react-hook-form";


const Piyachok = ({piyachok}) => {

    const {date, meetingDescription,writeToMe,gender,amountOfGuests,desireExpenses} =piyachok;


    return (
        <div>
            <div>date: {date}</div>
            <div>meetingDescription: {meetingDescription}</div>
            <div>writeToMe: {writeToMe}</div>
            <div>gender: {gender}</div>
            <div>amountOfGuests: {amountOfGuests}</div>
            <div>desireExpenses: {desireExpenses}</div>
            <hr/>
        </div>

    );
};

export {Piyachok};

