import React, { useState } from 'react';
import Tree from './Tree';
import styled from 'styled-components';

export const SbContainer = styled.div`
    min-width: 16rem;
    width: auto;
    height: auto;
    min-height: 70vh;
    font-size: 14px;
`;

// // 제일 하위메뉴에서 클릭할 Link
// export const SbLink = styled(Link)`
//     color: inherit;
//     text-decoration: inherit;
// `;

const ParentTree = ({ TreeMenu, clickAccess }) => {
    return (
        <SbContainer>
            {TreeMenu.map((list, index) => {
                return <Tree clickAccess={clickAccess} list={list} key={index}></Tree>;
            })}
        </SbContainer>
    );
};
export default ParentTree;
