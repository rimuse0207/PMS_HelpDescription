import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const HelpsContentsMainDivBox = styled.div`
    width: 100%;
    max-height: calc(100vh - 70px);
    overflow-y: auto;
    padding: 10px;
`;

const HelpsContents = () => {
    const { Code, Title } = useParams();
    return (
        <HelpsContentsMainDivBox>
            <div>{Code}</div>
            <div>{Title}</div>
            <div>Contents의 내용이 들어갑니다.</div>
        </HelpsContentsMainDivBox>
    );
};

export default HelpsContents;
