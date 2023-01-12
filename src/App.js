import {Routes, Route, Navigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

import {MainLayout, LoggedLayout, LoginLayout} from "./layouts";
import {
    AllNewsPage,
    LoginFormPage,
    MainNewsPage, CommentFullInformationPage, MyCommentsPage, MyNewsPage, MyPlacesPage,
    NotfoundPage,
    PlaceFullInformationPage,
    PlacesPage,
    RegisterFormPage, UserProfilePage,
    UsersPage, MyRatingPage, RatingFullInformationPage, UserFullInformationPage
} from "./pages";
import {authActions} from "./redux";
import {FavoritePlaces} from "./components";


const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions.getAuthorizedUser())
    }, [dispatch])

    return (
        <div>
            <Routes>
                <Route path={'/'} element={<LoginLayout/>}>
                    <Route index element={<Navigate to={'login'}/>}/>
                    <Route path={'login'} element={<LoginFormPage/>}/>
                    <Route path={'register'} element={<RegisterFormPage/>}/>
                </Route>

                <Route path={'/main'} element={<MainLayout/>}>
                    <Route path={'places'}>
                        <Route path={''} element={<PlacesPage/>}/>
                        <Route path={':id'} element={<PlaceFullInformationPage/>}/>
                    </Route>
                    <Route path={'news'}>
                        <Route index element={<Navigate to={'mainNews'}/>}/>
                        <Route path={'mainNews'} element={<MainNewsPage/>}/>
                        <Route path={'allNews'} element={<AllNewsPage/>}/>
                    </Route>
                </Route>
                <Route path={'/myCabinet'} element={<LoggedLayout/>}>
                    <Route index element={<Navigate to={'profile'}/>}/>
                    <Route path={'profile'} element={<UserProfilePage/>}/>
                    <Route path={'myNews'} element={<MyNewsPage/>}/>
                    <Route path={'myPlaces'}>
                        <Route path={''} element={<MyPlacesPage/>}/>
                        <Route path={':id'} element={<PlaceFullInformationPage/>}/>
                    </Route>
                    <Route path={'favoritePlaces'}>
                        <Route path={''} element={<FavoritePlaces/>}/>
                        <Route path={':id'} element={<PlaceFullInformationPage/>}/>
                    </Route>
                    <Route path={'myComments'}>
                        <Route path={''} element={<MyCommentsPage/>}/>
                        <Route path={':id'} element={<CommentFullInformationPage/>}/>
                    </Route>
                    <Route path={'myRatings'}>
                        <Route path={''} element={<MyRatingPage/>}/>
                        <Route path={':id'} element={<RatingFullInformationPage/>}/>
                    </Route>
                    <Route path={'allUsers'}>
                        <Route path={''} element={<UsersPage/>}/>
                        <Route path={':id'} element={<UserFullInformationPage/>}/>
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
