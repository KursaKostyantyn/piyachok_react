import css from "./PlaceSmallImage.module.css";
import {useDispatch} from "react-redux";
import {placeActions} from "../../redux";

const PlaceSmallImage = ({photo, index}) => {
    const dispatch = useDispatch();

    const setMainPhoto = async () => {
        await dispatch(placeActions.setMainPLacePhoto(photo))
    }

    return (
        <div>
            <div key={index} onClick={setMainPhoto}>
                <img className={css.SmallImage}
                     src={photo}
                     alt="place"/>
            </div>
        </div>
    );
};

export {PlaceSmallImage};