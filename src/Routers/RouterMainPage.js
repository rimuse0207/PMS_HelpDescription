import React, { useEffect, useState } from 'react';
import { Route, Routes, Router, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HelpsMainPage from '../Components/Helps/HelpsMainPage';
import MenuUpdate from '../Components/MenuUpdate/MenuUpdate';
import { MenuSidefetchData } from '../Models/ReduxThunks/MenuReduxThunks/SideMenuListReducerThunks';
import LoginMainPage from '../Components/Login/LoginMainPage';
import LoginRoute from './LoginRouteMainPage';
import SearchsMainPage from '../Components/Helps/SearchContents/SearchsMainPage';

const RouterMainPage = () => {
    const dispatch = useDispatch();
    const User_Info = useSelector(state => state.Login_Info_Reducer_State.Login_Info);
    const [RouterInfo, setRouterInfo] = useState([
        {
            path: '/admin/login',
            element: <LoginMainPage></LoginMainPage>,
            withAuthorization: false,
            withAdminAuthorization: false,
        },
        {
            path: '/Home/:Mode',
            element: <HelpsMainPage></HelpsMainPage>,
            withAuthorization: false,
            withAdminAuthorization: false,
        },
        {
            path: '/Home/:Mode/:Code/:Title/:parent_code/:parent_name',
            element: <HelpsMainPage></HelpsMainPage>,
            withAuthorization: false,
            withAdminAuthorization: false,
        },
        {
            path: '/Home/Search/:search_key',
            element: <SearchsMainPage></SearchsMainPage>,
            withAuthorization: false,
            withAdminAuthorization: false,
        },
        {
            path: '/admin/Menu/:Mode/:Code/:Title/:parent_code/:parent_name',
            element: <MenuUpdate></MenuUpdate>,
            withAuthorization: true,
            withAdminAuthorization: false,
        },
        {
            path: '/admin/Menu/:Mode/:parent_code/:parent_name',
            element: <MenuUpdate></MenuUpdate>,
            withAuthorization: true,
            withAdminAuthorization: false,
        },
        {
            path: '/admin/Menu/:Mode/:Code/:Title/:parent_code/:parent_name',
            element: <MenuUpdate></MenuUpdate>,
            withAuthorization: true,
            withAdminAuthorization: false,
        },
    ]);

    useEffect(() => {
        dispatch(MenuSidefetchData());
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                {RouterInfo.map(route => {
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <LoginRoute
                                    withAdminAuthorization={route.withAdminAuthorization}
                                    withAuthorization={route.withAuthorization}
                                    component={route.element}
                                    User_Info={User_Info}
                                ></LoginRoute>
                            }
                        ></Route>
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
};
export default RouterMainPage;
