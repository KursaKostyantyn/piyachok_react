import {PlaceFullInformation} from "../../components";
import {Outlet} from "react-router-dom";

const PlaceFullInformationPage = () => {
    return (
        <div>
            <PlaceFullInformation/>
            <Outlet/>
        </div>
    );
};

export {PlaceFullInformationPage};