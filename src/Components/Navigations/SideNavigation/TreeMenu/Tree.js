import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HiChevronUp } from 'react-icons/hi';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Change_Side_Menu_Select_Actions } from '../../../../Models/MenuReducers/MenuModeReducer/MenuModeReducer';
import { useDispatch } from 'react-redux';

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
    height: 32px;
    color: gray;
    background-color: ${props => (props.NowChecked ? 'lightgray' : '')};
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
// export const SbLink = styled(Link)`
//     color: inherit;
//     text-decoration: inherit;
// `;

const Tree = ({ list, depth = 0, clickAccess }) => {
    const dispatch = useDispatch();
    const Navigation = useNavigate();
    const { Code, Mode } = useParams();

    const [collapsed, setCollapsed] = useState(false);
    const icon = collapsed ? <FaMinus /> : <FaPlus />;

    function toggleCollapse(list) {
        dispatch(Change_Side_Menu_Select_Actions(list));
        if (clickAccess) {
            setCollapsed(prevValue => !prevValue);

            Navigation(`/Home/Helps/${list.menu_code}/${list.menu_name}/${list.menu_parent_code}/${list.menu_parent_name}`);
        } else {
            setCollapsed(prevValue => !prevValue);
            Navigation(`/admin/Menu/${Mode}/${list.menu_code}/${list.menu_name}/${list.menu_parent_code}/${list.menu_parent_name}`);
        }
    }
    if (list.children.length > 0) {
        return (
            <div>
                <SbTitle
                    depth={depth}
                    onClick={() => toggleCollapse(list)}
                    style={Code === list.menu_code ? { backgroundColor: '#f6f6f2', fontWeight: 'bolder', color: 'black' } : {}}
                >
                    <span className="Menu_Icons">{icon}</span>
                    <span>{list.menu_name}</span>
                </SbTitle>
                <SbSub isOpen={collapsed}>
                    {list.children.map(child => {
                        return <Tree list={child} depth={depth + 1} clickAccess={clickAccess} />;
                    })}
                </SbSub>
            </div>
        );
    } else {
        return (
            <>
                <SbTitle
                    depth={depth}
                    onClick={() => toggleCollapse(list)}
                    style={Code === list.menu_code ? { backgroundColor: '#f6f6f2', fontWeight: 'bolder', color: 'black' } : {}}
                >
                    <span>{list.menu_name}</span>
                </SbTitle>
            </>
        );
    }
};
export default Tree;
