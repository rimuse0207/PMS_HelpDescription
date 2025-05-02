import React, { useEffect, useRef, useState } from 'react';
import ParentTree from './TreeMenu/ParentTree';
import { Request_Get_Axios, Request_Post_Axios } from '../../../API/index';
import styled, { keyframes, css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { MenuSidefetchData } from '../../../Models/ReduxThunks/MenuReduxThunks/SideMenuListReducerThunks';
import { toast } from '../../../ToastMessage/ToastManager';
import { Logout_Inistate_State_Func } from '../../../Models/LoginReducers/LoginInfoReduce';
import DeleteConfrimModal from '../../Modal/DeleteConfrimModal';
import { Change_Side_Menu_Width_Func } from '../../../Models/MenuReducers/SideMenuWidthReducer/SideMenuWidthReducer';

// 동적 width를 받아서 keyframes 생성
const fadeIn = width => keyframes`

  100% {
    opacity: 1;
    transform: translateX(0);
    width: ${width}px;
  }
`;

const fadeOut = width => keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
    width: ${width}px;
  }
  100% {
    opacity: 0;
    transform: translateX(-${width}px);
    width: 0;
  }
`;

const SideNavigationMainPageMainDivBox = styled.div`
    border: 1px solid lightgray;
    height: calc(100vh - 80px);
    width: ${({ width }) => `${width}px`};
    overflow-y: auto;
    margin-top: 10px;
    padding-left: 10px;

    /*동적 width 기반 애니메이션 적용 */
    animation: ${({ show, width, isInitialized }) =>
        isInitialized
            ? css`
                  ${show ? fadeIn(width) : fadeOut(width)} 0.3s ease-in-out forwards
              `
            : 'none'};

    .Button_Group {
        margin-top: 5px;
        margin-bottom: 5px;
        text-align: end;
        position: sticky;
        top: 5px;
        background: #fff;
    }
`;

const SideMenuMainContainers = styled.div`
    position: relative;
    .Move_Width_Cotaniner {
        width: 15px;
        height: 40px;
        border: 1px solid lightgray;
        position: absolute;
        top: 45%;
        right: -15px;
        transform: translate(0, -45%);
        z-index: 100;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        border-left: none;
        &:hover {
            cursor: w-resize;
        }
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
    const dispatch = useDispatch();
    const Navigation = useNavigate();
    const { Mode, Code, Title, parent_code, parent_name } = useParams();
    const Side_Select_Menu_State = useSelector(state => state.Menu_Mode_Reducer.Side_Select_Menu);
    const Side_Menu_Toggle = useSelector(state => state.Change_Side_Menus_Reducer.Side_Menu);
    const TreeMenu = useSelector(state => state.SideMenuListReducerThunks.data);
    const Login_Info_State = useSelector(state => state.Login_Info_Reducer_State.Login_Info);
    const [Delete_Confirm_Modal_Open, setDelete_Confirm_Modal_Open] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    // const [WidthSize, setWidthSize] = useState(300);
    const WidthSize = useSelector(state => state.Change_Side_Menus_Width_Reducer.Side_Menu_Width);
    const isDragging = useRef(false);
    useEffect(() => {
        MenuSidefetchData();
        // 컴포넌트가 처음 렌더링될 때 애니메이션 적용 방지
        setIsInitialized(true);
    }, []);

    const Open_Menu_Add = async Select_Mode => {
        if (Code === 'TOP') {
            toast.show({
                title: `메뉴를 선택 후 이용해 주세요.`,
                successCheck: true,
                duration: 6000,
            });
        } else {
            Navigation(
                `/admin/Menu/${Select_Mode}/${Side_Select_Menu_State.menu_code}/${Side_Select_Menu_State.menu_name}/${Side_Select_Menu_State.menu_parent_code}/${Side_Select_Menu_State.menu_parent_name}`
            );
        }
    };

    const Handle_Delete_Menu = () => {
        if (Code === 'TOP') {
            return toast.show({
                title: `TOP메뉴는 삭제가 불가합니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
        setDelete_Confirm_Modal_Open(true);
    };
    const OnConfirm = async () => {
        const Send_To_Server_For_Delete_Side_Menu = await Request_Post_Axios('/Pms_Route/MenuRouter/Send_To_Server_For_Delete_Side_Menu', {
            Code,
        });
        if (Send_To_Server_For_Delete_Side_Menu.status) {
            setDelete_Confirm_Modal_Open(false);
            toast.show({
                title: `삭제 처리가 완료되었습니다.`,
                successCheck: true,
                duration: 6000,
            });
            MenuSidefetchData();
            Navigation(`/admin/Menu/Default/TOP/TOP/TOP/TOP`);
        }
    };
    // ADMIN 메뉴 생성
    const Admin_Contents = () => {
        if (Login_Info_State) {
            if (Login_Info_State.id) {
                return Login_Info_State.access.map(list => {
                    return list.pms_admin_access_name === 'helps' ? (
                        <div className="Button_Group">
                            <FuncButton onClick={() => Open_Menu_Add('Insert')}> 추 가 </FuncButton>
                            <FuncButton onClick={() => Open_Menu_Add('Update')}> 수 정 </FuncButton>
                            <FuncButton onClick={() => Open_Menu_Add('Switch')}> 순서변경 </FuncButton>
                            <FuncButton onClick={() => Handle_Delete_Menu()}> 삭제 </FuncButton>
                        </div>
                    ) : (
                        <></>
                    );
                });
            }
        }
    };

    /// 로그아웃
    const Handle_Submit_Logout = () => {
        dispatch(Logout_Inistate_State_Func());
    };
    // ADMIN 메뉴 생성
    const Amdin_Menu_Update = () => {
        if (Login_Info_State) {
            if (Login_Info_State.id) {
                return Login_Info_State.access.map(list => {
                    return list.pms_admin_access_name === 'helps' ? (
                        Code ? (
                            <div className="Button_Group">
                                <FuncButton
                                    onClick={() => Navigation(`/admin/Menu/Defulat/${Code}/${Title}/${parent_code}/${parent_name}`)}
                                >
                                    {' '}
                                    메 뉴 수 정{' '}
                                </FuncButton>
                                <FuncButton onClick={() => Handle_Submit_Logout()}> 로 그 아 웃 </FuncButton>
                            </div>
                        ) : (
                            <></>
                        )
                    ) : (
                        <></>
                    );
                });
            }
        }
    };

    // 메뉴 크기 조절 함수들 ======
    const handleMouseDown = () => {
        isDragging.current = true;
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = e => {
        if (!isDragging.current) return;
        const newWidth = e.clientX;
        if (newWidth >= 200 && newWidth <= 1000) {
            // setWidthSize(newWidth);
            dispatch(Change_Side_Menu_Width_Func(newWidth));
        }
    };

    const handleMouseUp = () => {
        if (isDragging.current) {
            isDragging.current = false;
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
    };
    // ===================================================

    return (
        <SideMenuMainContainers className="Side_Menus_Container">
            <SideNavigationMainPageMainDivBox show={Side_Menu_Toggle} isInitialized={isInitialized} width={WidthSize}>
                {!clickAccess ? Admin_Contents() : Amdin_Menu_Update()}

                <ParentTree TreeMenu={TreeMenu} clickAccess={clickAccess}></ParentTree>
            </SideNavigationMainPageMainDivBox>
            <div className="Move_Width_Cotaniner" onMouseDown={handleMouseDown}></div>
            <DeleteConfrimModal
                isOpen={Delete_Confirm_Modal_Open}
                onClose={() => setDelete_Confirm_Modal_Open(false)}
                onConfirm={() => OnConfirm()}
                onMessage={'정말로 삭제 처리 하시겠습니까?'}
                onSubMessage={'삭제 시, 하위 메뉴 및 컨텐츠가 전부 삭제 됩니다.'}
            ></DeleteConfrimModal>
        </SideMenuMainContainers>
    );
};

export default SideNavigationMainPage;
