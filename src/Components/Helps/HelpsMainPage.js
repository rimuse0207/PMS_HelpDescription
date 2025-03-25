import React from 'react';
import TopNavigationMainPage from '../Navigations/TopNavigation/TopNavigaionMainPage';
import SideNavigationMainPage from '../Navigations/SideNavigation/SideNavigationMainPage';
import HelpsContents from './HelpsContents/HelpsContents';
import styled from 'styled-components';
import EditorContentsMainPage from './EditorContents/EditorContentsMainPage';
import { useParams } from 'react-router-dom';
import SearchContents from './SearchContents/SearchContents';

export const HelpsMainPageMainDivBox = styled.div`
    .HelpsFlexDivContainer {
        display: flex;
    }
`;

const HelpsMainPage = () => {
    const { Mode } = useParams();
    return (
        <HelpsMainPageMainDivBox>
            <TopNavigationMainPage></TopNavigationMainPage>
            <div className="HelpsFlexDivContainer">
                <SideNavigationMainPage clickAccess={true}></SideNavigationMainPage>
                {Mode === 'Helps' ? <HelpsContents></HelpsContents> : <></>}
                {/* <HelpsContents></HelpsContents> */}
                {Mode === 'Content_Update' ? <EditorContentsMainPage></EditorContentsMainPage> : <></>}
                {Mode === 'Searchs' ? <SearchContents></SearchContents> : <></>}
            </div>
        </HelpsMainPageMainDivBox>
    );
};

export default HelpsMainPage;
