import {useSelector} from "react-redux";

const CommentFullInformation = () => {
    const {currentComment} = useSelector(state => state.comments);

    const {id, text, place} = currentComment;

    return (
        <div>
            <div>id: {id}</div>
            <div>Назва закладу: {place.name}</div>
            <div>Коментарій: {text}</div>
        </div>
    );
};

export {CommentFullInformation};