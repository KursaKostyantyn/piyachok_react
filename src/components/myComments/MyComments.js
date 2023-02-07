//todo delete this component
// import {useDispatch, useSelector} from "react-redux";
// import {useEffect} from "react";
//
// import {commentsActions} from "../../redux";
// import {Comment} from "../comment/Comment";
// import {useSearchParams} from "react-router-dom";
//
// const MyComments = () => {
//     const {
//         comments,
//         nextPage,
//         previousPage,
//         currentPage,
//         amountOfPages,
//         amountOfItems
//     } = useSelector(state => state.comments);
//     const {authorizedUser} = useSelector(state => state.auth);
//     const dispatch = useDispatch();
//     const [query, setQuery] = useSearchParams({page: '1', old: 'false'});
//
//
//     useEffect(() => {
//         if (authorizedUser != null) {
//             dispatch(commentsActions.findCommentsByUserLogin({
//                 login: authorizedUser.login,
//                 page: query.get('page'),
//                 old: query.get('old')
//             }));
//         }
//
//     }, [authorizedUser, query])
//
//     const setOld = () => {
//         if (query.get('old') === 'true') {
//             setQuery({old: 'false'})
//         }
//         if (query.get('old') === 'false') {
//             setQuery({old: 'true'})
//         }
//     }
//
//     const goToPreviousPage = () => {
//         const page = +query.get('page') - 1;
//         const old=query.get('old')
//         setQuery({page: `${page}`,old:`${old}`})
//     }
//
//     const goToNextPage = () => {
//         const page = +query.get('page') + 1;
//         const old=query.get('old')
//         setQuery({page: `${page}`,old:`${old}`})
//     }
//
//     return (
//         <div>
//             <div>{query.get('old') === 'false' ? <button onClick={setOld}>Спочатку старі коментарі</button> :
//                 <button onClick={setOld}>Спочатку нові коментарі</button>}</div>
//             <button onClick={goToPreviousPage} disabled={previousPage === 0}>Попередня сторінка</button>
//             <span>{currentPage} з {amountOfPages}</span>
//             <button onClick={goToNextPage} disabled={nextPage === 0}>Наступна сторінка</button>
//             {comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
//         </div>
//     );
// };
//
// export {MyComments};