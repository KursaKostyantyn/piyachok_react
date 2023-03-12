import {Filters, Places} from "../../components/index";
import css from './PlacesPage.module.css';

const PlacesPage = () => {
    return (
        <div className={css.Wrap}>
            <div><Filters/></div>
            <div><Places/></div>
        </div>
    );
};

export {PlacesPage};