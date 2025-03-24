import React from 'react';
import ReactQuills from './ReactQuills/ReactQuills';
import styled from 'styled-components';
import { FuncButton } from '../../Navigations/SideNavigation/SideNavigationMainPage';

const EditorContentsMainPageMainDivBox = styled.div`
    height: calc(-70px + 100vh);
    width: 100%;
`;
const EditorContentsMainPage = () => {
    return (
        <EditorContentsMainPageMainDivBox>
            <ReactQuills></ReactQuills>
            <div style={{ marginRight: '50px', marginTop: '30px', paddingBottom: '30px', textAlign: 'end' }}>
                <FuncButton> 저 장 </FuncButton>
            </div>
        </EditorContentsMainPageMainDivBox>
    );
};

export default EditorContentsMainPage;
