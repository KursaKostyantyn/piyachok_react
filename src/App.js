import {Routes, Route, Navigate} from "react-router-dom";

import {MainLayout} from "./layouts";
import {
    AllNewsPage,
    LoginFormPage,
    MainNewsPage,
    NotfoundPage,
    PlaceFullInformationPage,
    PlacesPage,
    RegisterFormPage
} from "./pages";
import {LoginLayout} from "./layouts/loginLayout/LoginLayout";
import {LoggedLayout} from "./layouts/loggedLayout/LoggedLayout";
import {UsersPage} from "./pages/usersPage/UsersPage";


const App = () => {
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
                <Route path={'/users'} element={<LoggedLayout/>}>
                    <Route path={'/users'} element={<UsersPage/>}/>
                </Route>

                <Route path={'*'} element={<NotfoundPage/>}/>
            </Routes>
        </div>
    )
        ;
};

export {App};
