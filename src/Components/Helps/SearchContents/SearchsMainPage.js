import React from 'react';

import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import SearchContents from './SearchContents';
import TopNavigationMainPage from '../../Navigations/TopNavigation/TopNavigaionMainPage';
import SideNavigationMainPage from '../../Navigations/SideNavigation/SideNavigationMainPage';

export const HelpsMainPageMainDivBox = styled.div`
    .HelpsFlexDivContainer {
        display: flex;
    }
`;

const SearchsMainPage = () => {
    const { search_key } = useParams();
    return (
        <HelpsMainPageMainDivBox>
            <TopNavigationMainPage></TopNavigationMainPage>
            <div className="HelpsFlexDivContainer">
                <SideNavigationMainPage clickAccess={true}></SideNavigationMainPage>
                <SearchContents></SearchContents>
            </div>
        </HelpsMainPageMainDivBox>
    );
};

export default SearchsMainPage;
