import React from 'react';
import ReactQuills from './ReactQuills/ReactQuills';
import styled from 'styled-components';

const EditorContentsMainPageMainDivBox = styled.div`
    height: calc(-70px + 100vh);
    width: 100%;
`;
const EditorContentsMainPage = () => {
    return (
        <EditorContentsMainPageMainDivBox>
            <ReactQuills></ReactQuills>
        </EditorContentsMainPageMainDivBox>
    );
};

export default EditorContentsMainPage;
