import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import FindParent from './FindParent';

const HelpsContentsMainDivBox = styled.div`
    width: 100%;
    max-height: calc(100vh - 70px);
    overflow-y: auto;
    padding: 10px;
`;
const MenuContentsContainerDivBox = styled.div`
    padding: 10px;
    .Title_Group {
        font-size: 2em;
        font-weight: 500;
        margin-bottom: 20px;
    }
`;

const HelpsContents = () => {
    const { Code, Title } = useParams();
    return (
        <HelpsContentsMainDivBox>
            <FindParent></FindParent>
            <MenuContentsContainerDivBox>
                <h2 className="Title_Group">{Title}</h2>
                <div>Contents의 내용이 들어갑니다.</div>
            </MenuContentsContainerDivBox>
        </HelpsContentsMainDivBox>
    );
};

export default HelpsContents;
