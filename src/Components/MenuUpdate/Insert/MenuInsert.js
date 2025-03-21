import React from 'react';
import styled from 'styled-components';
import { HelpsMainPageMainDivBox } from '../../Helps/HelpsMainPage';
import TopNavigationMainPage from '../../Navigations/TopNavigation/TopNavigaionMainPage';
import SideNavigationMainPage from '../../Navigations/SideNavigation/SideNavigationMainPage';
import MenuUpdateContents from '../MenuUpdateContents/MenuUpdateContents';

const MenuInsert = () => {
    return (
        <HelpsMainPageMainDivBox>
            <TopNavigationMainPage></TopNavigationMainPage>
            <div className="HelpsFlexDivContainer">
                <SideNavigationMainPage clickAccess={false}></SideNavigationMainPage>
                <MenuUpdateContents></MenuUpdateContents>
            </div>
        </HelpsMainPageMainDivBox>
    );
};

export default MenuInsert;
