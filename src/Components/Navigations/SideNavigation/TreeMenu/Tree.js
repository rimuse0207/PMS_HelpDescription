import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { HiChevronUp } from 'react-icons/hi';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Change_Side_Menu_Select_Actions } from '../../../../Models/MenuReducers/MenuModeReducer/MenuModeReducer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataSuccess } from '../../../../Models/ReduxThunks/MenuReduxThunks/SideMenuListReducerThunks';
import { openMenusToTarget } from './TreeFunction';
import { TbPencilExclamation } from 'react-icons/tb';

// 사이드바 전체를 감싸는 div
export const SbContainer = styled.div`
    min-width: 16rem;
    width: auto;
    height: auto;
    min-height: 70vh;
    font-size: 14px;
`;

// SbItem에서 하위메뉴들을 묶어줄 div
export const SbSub = styled.div`
    overflow: hidden;
    max-height: ${props => (props.isOpen ? '100%' : '0')};
`;

// 메뉴명을 보여줄 div
export const SbTitle = styled.div`
    display: flex;
    align-items: center;
    padding-left: ${props => props.depth * 20}px;
    min-height: 32px;
    color: gray;
    background-color: ${props => (props.NowChecked ? 'lightgray' : '')};
    margin-bottom: 5px;
    &:hover {
        background-color: #f6f6f2;
        cursor: pointer;
        border-right: solid 5px;
    }
    .Menu_Icons {
        color: green;
        font-size: 10px;
        margin-right: 10px;
        font-weight: bolder;
        line-height: 0px;
    }
`;

export const UpdateContentMode = styled.span`
    margin-left: 20px;
    color: green;
    &:hover {
        cursor: pointer;
        opacity: 0.5;
    }
`;

// export const SbLink = styled(Link)`
//     color: inherit;
//     text-decoration: inherit;
// `;

const Tree = ({ list, depth = 0, clickAccess }) => {
    const dispatch = useDispatch();
    const Navigation = useNavigate();
    const { Code, Mode } = useParams();
    const TreeMenu = useSelector(state => state.SideMenuListReducerThunks.data);
    const Login_Info_State = useSelector(state => state.Login_Info_Reducer_State.Login_Info);
    const TreeMenustate = useSelector(state => state.SideMenuListReducerThunks.data);
    useEffect(() => {
        const Change_Datas = openMenusToTarget(TreeMenustate, Code);
        dispatch(fetchDataSuccess(Change_Datas));
    }, []);

    const Handle_Change_Update_Content_Mode = (e, list) => {
        e.preventDefault();
        e.stopPropagation();
        if (Mode === 'Content_Update') {
            if (window.confirm('작성중인 컨텐츠가 있습니다. 저장하지 않고 그냥 나가겠습니까?')) {
                const Change_Datas = toggleMenu(TreeMenu, list.menu_code);
                dispatch(fetchDataSuccess(Change_Datas));
                Navigation(`/Home/Content_Update/${list.menu_code}/${list.menu_name}/${list.menu_parent_code}/${list.menu_parent_name}`);
            }
        } else {
            const Change_Datas = toggleMenu(TreeMenu, list.menu_code);
            dispatch(fetchDataSuccess(Change_Datas));
            Navigation(`/Home/Content_Update/${list.menu_code}/${list.menu_name}/${list.menu_parent_code}/${list.menu_parent_name}`);
        }
    };

    function toggleCollapse(e, list) {
        e.preventDefault();
        e.stopPropagation();
        dispatch(Change_Side_Menu_Select_Actions(list));
        if (clickAccess) {
            if (Mode === 'Content_Update') {
                if (window.confirm('작성중인 컨텐츠가 있습니다. 저장하지 않고 그냥 나가겠습니까?')) {
                    const Change_Datas = toggleMenu(TreeMenu, list.menu_code);
                    dispatch(fetchDataSuccess(Change_Datas));
                    Navigation(`/Home/Helps/${list.menu_code}/${list.menu_name}/${list.menu_parent_code}/${list.menu_parent_name}`);
                }
            } else {
                const Change_Datas = toggleMenu(TreeMenu, list.menu_code);
                dispatch(fetchDataSuccess(Change_Datas));
                Navigation(`/Home/Helps/${list.menu_code}/${list.menu_name}/${list.menu_parent_code}/${list.menu_parent_name}`);
            }
        } else {
            const Change_Datas = toggleMenu(TreeMenu, list.menu_code);
            dispatch(fetchDataSuccess(Change_Datas));
            Navigation(`/admin/Menu/${Mode}/${list.menu_code}/${list.menu_name}/${list.menu_parent_code}/${list.menu_parent_name}`);
        }
    }

    const toggleMenu = (data, targetCode) => {
        const updatedData = data.map(item => {
            if (item.menu_code === targetCode) {
                // Toggle menu_open for the item
                return { ...item, menu_open: !item.menu_open };
            }
            if (item.children.length > 0) {
                // Recurse into children if they exist
                return { ...item, children: toggleMenu(item.children, targetCode) };
            }
            return item;
        });
        return updatedData;
    };

    // editor 수정 권한 표시
    const Admin_Contents = Select_Item => {
        if (Login_Info_State) {
            if (Login_Info_State.id) {
                return Login_Info_State.access.map(list => {
                    return list.pms_admin_access_name === 'helps' ? (
                        <UpdateContentMode
                            onClick={e => Handle_Change_Update_Content_Mode(e, Select_Item)}
                            key={list.pms_admin_access_name}
                        >
                            <TbPencilExclamation />
                        </UpdateContentMode>
                    ) : (
                        <></>
                    );
                });
            }
        }
    };

    if (list.children.length > 0) {
        return (
            <div>
                <SbTitle
                    depth={depth}
                    onClick={e => toggleCollapse(e, list)}
                    style={Code === list.menu_code ? { backgroundColor: '#f6f6f2', fontWeight: 'bolder', color: 'black' } : {}}
                >
                    <span className="Menu_Icons">{list.menu_open ? <FaMinus /> : <FaPlus />}</span>
                    <span>{list.menu_name}</span>
                    {Admin_Contents(list)}
                </SbTitle>
                <SbSub isOpen={list.menu_open}>
                    {list.children.map(child => {
                        return <Tree key={child.menu_code} list={child} depth={depth + 1} clickAccess={clickAccess} />;
                    })}
                </SbSub>
            </div>
        );
    } else {
        return (
            <>
                <SbTitle
                    depth={depth}
                    onClick={e => toggleCollapse(e, list)}
                    style={Code === list.menu_code ? { backgroundColor: '#f6f6f2', fontWeight: 'bolder', color: 'black' } : {}}
                >
                    <span>{list.menu_name}</span>
                    {Admin_Contents(list)}
                </SbTitle>
            </>
        );
    }
};
export default React.memo(Tree);
