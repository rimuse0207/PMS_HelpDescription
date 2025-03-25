import React, { useEffect, useState } from 'react';
import Tree from './Tree';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDataSuccess } from '../../../../Models/ReduxThunks/MenuReduxThunks/SideMenuListReducerThunks';
import { openMenusToTarget } from './TreeFunction';

export const SbContainer = styled.div`
    width: auto;
    height: auto;
    min-height: 70vh;
    font-size: 14px;
`;

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
