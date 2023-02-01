import {Navigate, Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

import {LoggedLayout, LoginLayout, MainLayout} from "./layouts";
import {
    AllNewsPage,
    CommentFullInformationPage,
    LoginFormPage,
    MainNewsPage,
    MyCommentsPage,
    MyNewsPage,
    MyPlacesPage,
    MyRatingPage,
    NotfoundPage,
    PlaceFullInformationPage,
    PlaceNewsPage,
    PlacesPage,
    RatingFullInformationPage,
    RegisterFormPage,
    UsersPage,
    UserProfilePage,
    UserFullInformationPage,
    OneNewsFullInformationPage,
    PlaceFormPage,
    NewsFormPage,
    CommentFormPage,
    CommentsPage, ActivateUserPage,
    SendResetPasswordTokenFormPage, ResetPasswordFormPage
} from "./pages";
import {authActions} from "./redux";
import {FavoritePlaces, OneNewsFullInformation} from "./components";


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
                            <Route path={'comments'} element={<CommentsPage/>}/>
                            <Route path={'comments/addComment'} element={<CommentFormPage/>}/>
                            <Route path={'news/:newsId'} element={<OneNewsFullInformation/>}/>
                        </Route>
                    </Route>
                    <Route path={'news'}>
                        <Route index element={<Navigate to={'mainNews'}/>}/>
                        <Route path={'mainNews'}>
                            <Route path={''} element={<MainNewsPage/>}/>
                            <Route path={'news/:newsId'} element={<OneNewsFullInformation/>}/>
                        </Route>
                        <Route path={'allNews'}>
                            <Route path={''} element={<AllNewsPage/>}/>
                            <Route path={'news/:newsId'} element={<OneNewsFullInformation/>}/>
                        </Route>

                    </Route>
                </Route>
                <Route path={'/myCabinet'} element={<LoggedLayout/>}>
                    <Route index element={<Navigate to={'profile'}/>}/>
                    <Route path={'profile'}>
                        <Route path={':userId'} element={<UserFullInformationPage/>}/>
                        <Route path={''} element={<UserProfilePage/>}/>
                    </Route>

                    <Route path={'createPlace'} element={<PlaceFormPage/>}/>

                    <Route path={'myNews'}>
                        <Route path={''} element={<MyNewsPage/>}/>
                        <Route path={'news/:newsId'}>
                            <Route path={'update'} element={<NewsFormPage/>}/>
                            <Route path={''} element={<OneNewsFullInformation/>}/>
                        </Route>

                    </Route>

                    <Route path={'myPlaces'}>
                        <Route path={':placeId/update'} element={<PlaceFormPage/>}/>
                        <Route path={''} element={<MyPlacesPage/>}/>

                        <Route path={':placeId'} element={<PlaceFullInformationPage/>}>
                            <Route path={''} element={<PlaceNewsPage/>}/>
                            <Route path={'news'} element={<PlaceNewsPage/>}/>
                            <Route path={'comments'} element={<CommentsPage/>}/>
                            <Route path={'comments/addComment'} element={<CommentFormPage/>}/>
                            <Route path={'addNews'} element={<NewsFormPage/>}/>
                            <Route path={'news/:newsId'} element={<OneNewsFullInformationPage/>}/>
                        </Route>
                    </Route>

                    <Route path={'favoritePlaces'}>
                        <Route path={''} element={<FavoritePlaces/>}/>
                        <Route path={':placeId'} element={<PlaceFullInformationPage/>}>
                            <Route path={''} element={<PlaceNewsPage/>}/>
                            <Route path={'news'} element={<PlaceNewsPage/>}/>
                            <Route path={'comments'} element={<CommentsPage/>}/>
                            <Route path={'comments/addComment'} element={<CommentFormPage/>}/>
                            <Route path={'news/:newsId'} element={<OneNewsFullInformationPage/>}/>
                        </Route>
                    </Route>

                    <Route path={'myComments'}>
                        <Route path={''} element={<MyCommentsPage/>}/>
                        <Route path={':myCommentsId'} element={<CommentFullInformationPage/>}/>
                        <Route path={':myCommentsId/updateComment'} element={<CommentFormPage/>}/>
                    </Route>

                    <Route path={'myRatings'}>
                        <Route path={''} element={<MyRatingPage/>}/>
                        <Route path={':myRatingsId'} element={<RatingFullInformationPage/>}/>
                    </Route>

                    <Route path={'allUsers'}>
                        <Route path={''} element={<UsersPage/>}/>
                        <Route path={':userId'} element={<UserProfilePage/>}/>
                    </Route>


                    <Route path={'users'} element={<UsersPage/>}/>
                </Route>

                <Route path={'*'} element={<NotfoundPage/>}/>
            </Routes>
        </div>
    )
        ;
};

export {App};
