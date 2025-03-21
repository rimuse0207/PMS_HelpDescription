import React, { useEffect, useState } from 'react';
import ParentTree from './TreeMenu/ParentTree';
import { Request_Get_Axios } from '../../../API/index';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { MenuSidefetchData } from '../../../Models/ReduxThunks/MenuReduxThunks/SideMenuListReducerThunks';

// 애니메이션: 메뉴가 나타날 때와 사라질 때
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-300px); /* 왼쪽에서부터 슬라이드 */
    display:none;
    width: 0px;
  }
  100% {
    opacity: 1;
    transform: translateX(0);
    display:block;
    width: 300px;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
    display:block;
    width: 300px;
  }
  100% {
    opacity: 0;
    
    transform: translateX(-300px); /* 왼쪽으로 슬라이드 */
    width: 0;
    display:none;
  }
`;
const SideNavigationMainPageMainDivBox = styled.div`
    border: 1px solid lightgray;
    height: calc(100vh - 80px);
    width: 300px;
    overflow-y: auto;
    margin-top: 10px;
    padding-left: 10px;
    animation: ${props => (props.show ? fadeIn : fadeOut)} 0.3s ease-in forwards;

    .Button_Group {
        margin-top: 5px;
        margin-bottom: 5px;
        text-align: end;
    }
`;

export const FuncButton = styled.button`
    outline: none;
    padding: 5px;
    border: 1px solid lightgray;
    margin-right: 10px;
    background-color: #fff;
    border-radius: 5px;

    &:hover {
        cursor: pointer;
        background-color: #efefef;
    }
`;

const SideNavigationMainPage = ({ clickAccess }) => {
    const Navigation = useNavigate();
    const { Mode, Code, Title } = useParams();
    const Side_Select_Menu_State = useSelector(state => state.Menu_Mode_Reducer.Side_Select_Menu);
    const Side_Menu_Toggle = useSelector(state => state.Change_Side_Menus_Reducer.Side_Menu);
    const TreeMenu = useSelector(state => state.SideMenuListReducerThunks.data);
    // const [TreeMenu, setTreeMenu] = useState([]);

    // const GetTreeMenu = async () => {
    //     const a = await Request_Get_Axios('/Ce_Route/Tools/Test_Test_Test');
    //     console.log(a);
    //     setTreeMenu(a.data);
    // };

    useEffect(() => {
        // GetTreeMenu();
        MenuSidefetchData();
    }, []);

    const Open_Menu_Add = async Select_Mode => {
        Navigation(
            `/admin/Menu/${Select_Mode}/${Side_Select_Menu_State.menu_code}/${Side_Select_Menu_State.menu_name}/${Side_Select_Menu_State.menu_parent_code}/${Side_Select_Menu_State.menu_parent_name}`
        );
    };

    return (
        <SideNavigationMainPageMainDivBox show={Side_Menu_Toggle}>
            {!clickAccess ? (
                <div className="Button_Group">
                    <FuncButton onClick={() => Open_Menu_Add('Insert')}> 추 가 </FuncButton>
                    <FuncButton onClick={() => Open_Menu_Add('Update')}> 수 정 </FuncButton>
                    {/* <FuncButton> 삭 제 </FuncButton> */}
                    <FuncButton onClick={() => Open_Menu_Add('Switch')}> 순서변경 </FuncButton>
                </div>
            ) : (
                <></>
            )}

            <ParentTree TreeMenu={TreeMenu} clickAccess={clickAccess}></ParentTree>
        </SideNavigationMainPageMainDivBox>
    );
};

export default SideNavigationMainPage;
