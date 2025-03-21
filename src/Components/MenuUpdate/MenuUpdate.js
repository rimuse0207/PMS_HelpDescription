import React, { Component, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import SideNavigationMainPage from '../Navigations/SideNavigation/SideNavigationMainPage';
import TopNavigationMainPage from '../Navigations/TopNavigation/TopNavigaionMainPage';
import { HelpsMainPageMainDivBox } from '../Helps/HelpsMainPage';
import MenuUpdateContents from './MenuUpdateContents/MenuUpdateContents';
import { useSelector } from 'react-redux';

const MenuUpdateMainDivBox = styled.div`
    border: 1px solid black;
`;

const MenuUpdate = () => {
    const { Mode } = useParams();
    const UpdateMode = useSelector(state => state.Menu_Mode_Reducer.Menu_Update_Mode);

    return (
        <HelpsMainPageMainDivBox>
            <TopNavigationMainPage></TopNavigationMainPage>
            <div className="HelpsFlexDivContainer">
                <SideNavigationMainPage clickAccess={false}></SideNavigationMainPage>
                {UpdateMode.map(list => {
                    return list.UpdateMode === Mode ? list.Component : <></>;
                })}
            </div>
        </HelpsMainPageMainDivBox>
    );
};

export default MenuUpdate;
