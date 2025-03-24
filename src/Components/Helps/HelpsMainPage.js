import React from 'react';
import TopNavigationMainPage from '../Navigations/TopNavigation/TopNavigaionMainPage';
import SideNavigationMainPage from '../Navigations/SideNavigation/SideNavigationMainPage';
import HelpsContents from './HelpsContents/HelpsContents';
import styled from 'styled-components';
import EditorContentsMainPage from './EditorContents/EditorContentsMainPage';

export const HelpsMainPageMainDivBox = styled.div`
    .HelpsFlexDivContainer {
        display: flex;
    }
`;

const HelpsMainPage = () => {
    return (
        <HelpsMainPageMainDivBox>
            <TopNavigationMainPage></TopNavigationMainPage>
            <div className="HelpsFlexDivContainer">
                <SideNavigationMainPage clickAccess={true}></SideNavigationMainPage>
                <HelpsContents></HelpsContents>
                {/* <EditorContentsMainPage></EditorContentsMainPage> */}
            </div>
        </HelpsMainPageMainDivBox>
    );
};

export default HelpsMainPage;
