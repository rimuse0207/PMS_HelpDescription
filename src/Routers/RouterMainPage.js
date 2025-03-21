import React, { useEffect, useState } from 'react';
import { Route, Routes, Router, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HelpsMainPage from '../Components/Helps/HelpsMainPage';
import MenuUpdate from '../Components/MenuUpdate/MenuUpdate';
import { MenuSidefetchData } from '../Models/ReduxThunks/MenuReduxThunks/SideMenuListReducerThunks';

const RouterMainPage = () => {
    const dispatch = useDispatch();
    const [RouterInfo, setRouterInfo] = useState([
        // {
        //     path: '/',
        //     element: <LoginMainPage></LoginMainPage>,
        //     withAuthorization: false,
        //     withAdminAuthorization: false,
        // },
        {
            path: '/Home/Helps',
            element: <HelpsMainPage></HelpsMainPage>,
            withAuthorization: true,
            withAdminAuthorization: false,
        },
        {
            path: '/Home/Helps/:Code/:Title/:parent_code/:parent_name',
            element: <HelpsMainPage></HelpsMainPage>,
            withAuthorization: true,
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
                    return <Route key={route.path} path={route.path} element={route.element}></Route>;
                })}
            </Routes>
        </BrowserRouter>
    );
};
export default RouterMainPage;
