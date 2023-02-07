import {Navigate, Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

import {LoggedLayout, LoginLayout, MainLayout} from "./layouts";
import {
    ActivateUserPage,
    AllNewsPage,
    CommentFormPage,
    CommentFullInformationPage,
    CommentsPage, FavoritePlacesPage,
    LoginFormPage,
    MainNewsPage,
    MyNewsPage,
    MyPlacesPage,
    MyRatingPage,
    NewsFormPage,
    NotfoundPage,
    OneNewsFullInformationPage,
    PlaceCommentsPage,
    PlaceFormPage,
    PlaceFullInformationPage,
    PlaceNewsPage,
    PlacesPage,
    RatingFullInformationPage,
    RegisterFormPage,
    ResetPasswordFormPage,
    SendResetPasswordTokenFormPage, UserFormPage,
    UserFullInformationPage,
    UserProfilePage,
    UsersPage
} from "./pages";
import {authActions} from "./redux";


const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions.getAuthorizedUser())
    }, [dispatch])

    return (
        <div>
            <Routes>
                <Route path={'/'} element={<LoginLayout/>}>
                    <Route index element={<Navigate to={'/main/places'}/>}/>
                    <Route path={'login'} element={<LoginFormPage/>}/>
                    <Route path={'register'} element={<RegisterFormPage/>}/>
                    <Route path={'activate'} element={<ActivateUserPage/>}/>
                    <Route path={'sendResetPasswordToken'} element={<SendResetPasswordTokenFormPage/>}/>
                    <Route path={'resetPassword'} element={<ResetPasswordFormPage/>}/>
                </Route>

                <Route path={'/main'} element={<MainLayout/>}>
                    <Route path={'places'}>
                        <Route path={''} element={<PlacesPage/>}/>
                        <Route path={':placeId'} element={<PlaceFullInformationPage/>}>
                            <Route path={'news'} element={<PlaceNewsPage/>}/>
                            <Route path={'comments'}>
                                <Route path={''} element={<PlaceCommentsPage/>}/>
                                <Route path={':commentId'} element={<CommentFullInformationPage/>}/>
                                <Route path={'comments/addComment'} element={<CommentFormPage/>}/>
                            </Route>


                            <Route path={'news/:newsId'} element={<OneNewsFullInformationPage/>}/>
                        </Route>
                    </Route>
                    <Route path={'news'}>
                        <Route index element={<Navigate to={'mainNews'}/>}/>
                        <Route path={'mainNews'}>
                            <Route path={''} element={<MainNewsPage/>}/>
                            <Route path={'news/:newsId'} element={<OneNewsFullInformationPage/>}/>
                        </Route>
                        <Route path={'allNews'}>
                            <Route path={''} element={<AllNewsPage/>}/>
                            <Route path={'news/:newsId'} element={<OneNewsFullInformationPage/>}/>
                        </Route>

                    </Route>
                </Route>
                <Route path={'/myCabinet'} element={<LoggedLayout/>}>
                    <Route index element={<Navigate to={'profile'}/>}/>

                    <Route path={'profile'}>
                        <Route path={':userId'} element={<UserFullInformationPage/>}/>
                        <Route path={':userId/update'} element={<UserFormPage/>}/>
                        <Route path={''} element={<UserProfilePage/>}/>
                    </Route>

                    <Route path={'createPlace'} element={<PlaceFormPage/>}/>

                    <Route path={'myNews'}>
                        <Route path={''} element={<MyNewsPage/>}/>
                        <Route path={'news/:newsId'}>
                            <Route path={'update'} element={<NewsFormPage/>}/>
                            <Route path={''} element={<OneNewsFullInformationPage/>}/>
                        </Route>

                    </Route>

                    <Route path={'myPlaces'}>
                        <Route path={':placeId/update'} element={<PlaceFormPage/>}/>
                        <Route path={''} element={<MyPlacesPage/>}/>

                        <Route path={':placeId'} element={<PlaceFullInformationPage/>}>
                            <Route path={''} element={<PlaceNewsPage/>}/>
                            <Route path={'news'}>
                                <Route path={''} element={<PlaceNewsPage/>}/>
                                <Route path={'news/:newsId'}>
                                    <Route path={'update'} element={<NewsFormPage/>}/>
                                    <Route path={''} element={<OneNewsFullInformationPage/>}/>
                                </Route>
                            </Route>
                            <Route path={'comments'}>
                                <Route path={''} element={<PlaceCommentsPage/>}/>
                                <Route path={'addComment'} element={<CommentFormPage/>}/>
                                <Route path={':commentId'}>
                                    <Route path={''} element={<CommentFullInformationPage/>}/>
                                    <Route path={'updateComment'} element={<CommentFormPage/>}/>
                                </Route>
                            </Route>
                            <Route path={'news/addNews'} element={<NewsFormPage/>}/>
                        </Route>

                    </Route>

                    <Route path={'favoritePlaces'}>
                        <Route path={''} element={<FavoritePlacesPage/>}/>
                        <Route path={':placeId'} element={<PlaceFullInformationPage/>}>
                            <Route path={''} element={<PlaceNewsPage/>}/>
                            <Route path={'news'} element={<PlaceNewsPage/>}/>
                            <Route path={'comments'} element={<PlaceCommentsPage/>}/>
                            <Route path={'comments/addComment'} element={<CommentFormPage/>}/>
                            <Route path={'news/:newsId'} element={<OneNewsFullInformationPage/>}/>
                        </Route>
                    </Route>

                    <Route path={'myComments'}>
                        <Route path={''} element={<CommentsPage/>}/>
                        <Route path={':commentId'} element={<CommentFullInformationPage/>}/>
                        <Route path={':commentId/updateComment'} element={<CommentFormPage/>}/>
                    </Route>

                    <Route path={'myRatings'}>
                        <Route path={''} element={<MyRatingPage/>}/>
                        <Route path={':myRatingsId'} element={<RatingFullInformationPage/>}/>
                    </Route>

                    <Route path={'allUsers'}>
                        <Route path={''} element={<UsersPage/>}/>
                        <Route path={':userId/update'} element={<UserFormPage/>}/>
                        <Route path={':userId'} element={<UserFullInformationPage/>}/>
                    </Route>

                    <Route path={'allComments'}>
                        <Route path={''} element={<CommentsPage/>}/>
                        <Route path={':commentId/updateComment'} element={<CommentFormPage/>}/>
                        <Route path={':commentId'} element={<CommentFullInformationPage/>}/>
                    </Route>

                    <Route path={'allPlaces'}>
                        <Route path={':placeId'} element={<PlaceFullInformationPage/>}>
                            <Route path={''} element={<PlaceNewsPage/>}/>
                            <Route path={'news'}>
                                <Route path={''} element={<PlaceNewsPage/>}/>
                                <Route path={'news/:newsId'}>
                                    <Route path={'update'} element={<NewsFormPage/>}/>
                                    <Route path={''} element={<OneNewsFullInformationPage/>}/>
                                </Route>
                            </Route>
                            <Route path={'comments'}>
                                <Route path={''} element={<PlaceCommentsPage/>}/>
                                <Route path={'addComment'} element={<CommentFormPage/>}/>
                                <Route path={':commentId'}>
                                    <Route path={''} element={<CommentFullInformationPage/>}/>
                                    <Route path={'updateComment'} element={<CommentFormPage/>}/>
                                </Route>
                            </Route>
                            <Route path={'news/addNews'} element={<NewsFormPage/>}/>
                        </Route>
                        <Route path={''} element={<PlacesPage/>}/>
                    </Route>

                    <Route path={'news'}>
                        <Route index element={<Navigate to={'mainNews'}/>}/>
                        <Route path={'mainNews'}>
                            <Route path={''} element={<MainNewsPage/>}/>
                            <Route path={'news/:newsId'}>
                                <Route path={'update'} element={<NewsFormPage/>}/>
                                <Route path={''} element={<OneNewsFullInformationPage/>}/>
                            </Route>
                        </Route>
                        <Route path={'allNews'}>
                            <Route path={''} element={<AllNewsPage/>}/>
                            <Route path={'news/:newsId'}>
                                <Route path={'update'} element={<NewsFormPage/>}/>
                                <Route path={''} element={<OneNewsFullInformationPage/>}/>
                            </Route>
                        </Route>
                    </Route>
                </Route>

                <Route path={'*'} element={<NotfoundPage/>}/>
            </Routes>
        </div>
    );
};

export
{
    App
}
    ;
